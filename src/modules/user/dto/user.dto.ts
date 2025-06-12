import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { statusJabatan } from '../entitities/user.entities';

export class userDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEnum(statusJabatan, {
    message: 'Jabatan Harus Sesuai dengan yang telah di tentukan',
  })
  @IsOptional()
  statusJabatan: statusJabatan;
}
