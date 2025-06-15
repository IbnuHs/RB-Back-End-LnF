import { IsNotEmpty } from 'class-validator';
import { Categories } from 'src/modules/category/entities/category.entitites';

export class createItemDTO {
  @IsNotEmpty()
  itemName: String;

  @IsNotEmpty()
  description: String;

  @IsNotEmpty()
  category: Categories;
}
