import { IsObjectId } from 'class-validator-mongo-object-id';

export class deleteUserDTO {
  @IsObjectId()
  id: string;
}
