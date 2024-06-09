import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDTO } from 'src/dto/password/sign-in.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<any> {
    try {
      const user = await this.usersService.findUserByEmail(signInDTO.email);
      const isMatch = await bcrypt.compare(signInDTO.password, user.password);

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      if (!isMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = { mail: signInDTO.email, id: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
