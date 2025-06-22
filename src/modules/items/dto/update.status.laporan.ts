import { IsNotEmpty } from 'class-validator';
import { StatusLaporan } from '../Entities/items.entities';

export class UpdateStatusLaporanDTO {
  @IsNotEmpty()
  status: StatusLaporan;

  @IsNotEmpty()
  name: String;
}
