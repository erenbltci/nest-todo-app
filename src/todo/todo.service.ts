import { Injectable } from '@nestjs/common';
import { TodoStatusEnum } from '@prisma/client';
import { CreateTodoDto } from 'src/dto/todo/createTodo.dto';
import { deleteTodoDTO } from 'src/dto/todo/deleteTodo.dto';
import { findTodoByIdDTO } from 'src/dto/todo/findById.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(todo: CreateTodoDto) {
    let { title, description, status, userId } = todo;

    status === 'ACTIVE' ? TodoStatusEnum.ACTIVE : TodoStatusEnum.COMPLETED;

    return await this.prisma.todo.create({
      data: {
        title,
        description,
        status: status,
        author: {
          connect: { id: userId },
        },
      },
    });
  }

  async getTodoList(status: TodoStatusEnum = null) {
    if (status) {
      return await this.prisma.todo.findMany({});
    } else {
      return await this.prisma.todo.findMany({
        where: {
          status,
        },
      });
    }
  }

  async deleteTodo(deleteTodoDTO: deleteTodoDTO) {
    return await this.prisma.todo.delete({ where: deleteTodoDTO });
  }

  async findTodoById(findTodoById: findTodoByIdDTO) {
    return await this.prisma.todo.findUniqueOrThrow({ where: findTodoById });
  }
}
