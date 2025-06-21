import { IsNotEmpty } from 'class-validator';
import { JenisLaporan } from '../Entities/items.entities';
import { Categories } from 'src/modules/category/entities/category.entitites';
import { Location } from 'src/modules/location/entitites/location.entities';

export class UpdateItemDTO {
  @IsNotEmpty()
  itemName: String;

  @IsNotEmpty()
  description: String;

  @IsNotEmpty()
  category: Categories;

  @IsNotEmpty()
  location: Location;

  @IsNotEmpty()
  jenisLaporan: JenisLaporan;
}
