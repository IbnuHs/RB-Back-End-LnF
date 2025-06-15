import { IsNotEmpty } from 'class-validator';

export class AddLocationDTO {
  @IsNotEmpty()
  location: String;
}
