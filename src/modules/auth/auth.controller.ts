import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './dto/register.dto';
import { loginDTO } from './dto/login.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: registerDTO) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: loginDTO) {
    return this.authService.login(dto);
  }
}
