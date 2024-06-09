import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { deleteUserDTO } from 'src/dto/user/deleteUser.dto';
import { findUserByIdDTO } from 'src/dto/user/findById.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { UserRolesEnum } from '@prisma/client';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      const createdUser = await this.userService.createUser(createUserDto);

      return 'User created successfully.';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers() {
    try {
      const users = await this.userService.getUsers();

      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUser(@Param() findUserByIdDTO: findUserByIdDTO) {
    try {
      const user = await this.userService.findUserById(findUserByIdDTO);

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteUser(@Body() deleteUserDto: deleteUserDTO): Promise<string> {
    try {
      const deletedUser = await this.userService.deleteUser(deleteUserDto);

      return 'User deleted successfully.';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
