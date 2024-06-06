import { TodoStatusEnum } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;

  @IsObjectId()
  @IsNotEmpty()
  userId: string;
}
