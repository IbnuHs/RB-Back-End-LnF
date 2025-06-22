import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { extracToken } from './utils/jwt.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = extracToken(request);
      if (!token) {
        throw new UnauthorizedException('Plese Sign In');
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN,
      });
      request.user = payload;
      // console.log(request.user);
      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
