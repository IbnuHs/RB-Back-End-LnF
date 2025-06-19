import { IsNotEmpty, IsNumber } from 'class-validator';
import { Categories } from 'src/modules/category/entities/category.entitites';
import { Location } from 'src/modules/location/entitites/location.entities';
import { JenisLaporan } from '../Entities/items.entities';
import { Type } from 'class-transformer';

export class createItemDTO {
  @IsNotEmpty()
  itemName: String;

  @IsNotEmpty()
  itemDescription: String;

  @IsNotEmpty()
  jenisLaporan: JenisLaporan;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  category: Categories;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  location: Location;
}
