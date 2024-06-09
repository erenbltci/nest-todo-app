import { UserRolesEnum } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;

  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;
}
