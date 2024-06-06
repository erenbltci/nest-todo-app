import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { deleteUserDTO } from 'src/dto/user/deleteUser.dto';
import { findUserByIdDTO } from 'src/dto/user/findById.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDTO: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDTO });
  }

  async deleteUser(deleteUserDTO: deleteUserDTO) {
    return await this.prisma.user.delete({ where: deleteUserDTO });
  }

  async findUserById(findById: findUserByIdDTO) {
    return await this.prisma.user.findFirstOrThrow({ where: findById });
  }

  async getUser() {
    return await this.prisma.user.findMany();
  }
}
