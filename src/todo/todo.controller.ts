import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/todo/createTodo.dto';
import { TodoService } from './todo.service';
import { Todo, TodoStatusEnum } from '@prisma/client';
import { deleteTodoDTO } from 'src/dto/todo/deleteTodo.dto';
import { findTodoByIdDTO } from 'src/dto/todo/findById.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createUser(@Body() createTodo: CreateTodoDto): Promise<string> {
    try {
      const createdTodo = await this.todoService.createTodo(createTodo);

      return `${createdTodo.title} created successfully.`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteTodo(@Body() deleteTodo: deleteTodoDTO): Promise<string> {
    try {
      const deletedTodo = await this.todoService.deleteTodo(deleteTodo);

      return `${deletedTodo.id} deleted successfully.`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async listAllTodo(@Body() status: TodoStatusEnum | null): Promise<Todo[]> {
    try {
      const listTodos = await this.todoService.getTodoList(status);

      return listTodos;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findTodoById(@Param() id: findTodoByIdDTO): Promise<Todo> {
    try {
      const getTodo = await this.todoService.findTodoById(id);

      return getTodo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
