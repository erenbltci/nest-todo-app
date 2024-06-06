import { IsObjectId } from 'class-validator-mongo-object-id';

export class findTodoByIdDTO {
  @IsObjectId()
  id: string;
}
