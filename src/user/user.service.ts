import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { deleteUserDTO } from 'src/dto/user/deleteUser.dto';
import { findUserByIdDTO } from 'src/dto/user/findById.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDTO: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDTO.password, 10);
    createUserDTO.password = hash;

    return await this.prisma.user.create({ data: createUserDTO });
  }

  async deleteUser(deleteUserDTO: deleteUserDTO) {
    await this.prisma.todo.deleteMany({
      where: { authorId: deleteUserDTO.id },
    });

    return await this.prisma.user.delete({ where: deleteUserDTO });
  }

  async findUserById(findById: findUserByIdDTO) {
    return await this.prisma.user.findFirstOrThrow({ where: findById });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }
}
