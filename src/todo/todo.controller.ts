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
import { CreateTodoDto } from 'src/dto/todo/createTodo.dto';
import { TodoService } from './todo.service';
import { Todo, TodoStatusEnum, UserRolesEnum } from '@prisma/client';
import { deleteTodoDTO } from 'src/dto/todo/deleteTodo.dto';
import { findTodoByIdDTO } from 'src/dto/todo/findById.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async createTodo(@Body() createTodo: CreateTodoDto): Promise<string> {
    try {
      const createdTodo = await this.todoService.createTodo(createTodo);

      return `${createdTodo.title} created successfully.`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteTodo(@Body() deleteTodo: deleteTodoDTO): Promise<string> {
    try {
      const deletedTodo = await this.todoService.deleteTodo(deleteTodo);

      return `${deletedTodo.id} deleted successfully.`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async listAllTodo(@Body() status: TodoStatusEnum | null): Promise<Todo[]> {
    try {
      const listTodos = await this.todoService.getTodoList(status);

      return listTodos;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async findTodoById(@Param() id: findTodoByIdDTO): Promise<Todo> {
    try {
      const getTodo = await this.todoService.findTodoById(id);

      return getTodo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
