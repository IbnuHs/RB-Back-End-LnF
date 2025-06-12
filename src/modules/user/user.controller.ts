import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './dto/user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  Hello() {
    return 'Hello Wolrd';
  }

  @Post('register')
  register(@Body() dto: userDTO) {
    return this.userService.register(dto);
  }
}
