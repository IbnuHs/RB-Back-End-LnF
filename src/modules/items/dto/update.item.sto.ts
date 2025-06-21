import { IsNotEmpty } from 'class-validator';
import { JenisLaporan } from '../Entities/items.entities';
import { Categories } from 'src/modules/category/entities/category.entitites';

export class UpdateItem {
  @IsNotEmpty()
  itemName: String;

  @IsNotEmpty()
  description: String;

  @IsNotEmpty()
  caetegory: Categories;

  @IsNotEmpty()
  jenisLaporan: JenisLaporan;
}
