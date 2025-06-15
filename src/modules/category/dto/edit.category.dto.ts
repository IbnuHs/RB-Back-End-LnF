import { IsNotEmpty } from 'class-validator';

export class EditCategoryDTO {
  @IsNotEmpty()
  category: String;
}
