import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class loginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
