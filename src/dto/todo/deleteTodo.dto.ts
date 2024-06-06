import { IsObjectId } from 'class-validator-mongo-object-id';

export class deleteTodoDTO {
  @IsObjectId()
  id: string;
}
