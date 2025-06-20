import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { statusJabatan } from '../../user/entitities/user.entities';

export class registerDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

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
