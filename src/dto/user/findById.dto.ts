import { IsObjectId } from 'class-validator-mongo-object-id';

export class findUserByIdDTO {
  @IsObjectId()
  id: string;
}
