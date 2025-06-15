import { IsNotEmpty } from 'class-validator';

export class AddCategoryDTO {
  @IsNotEmpty()
  category: String;
}
