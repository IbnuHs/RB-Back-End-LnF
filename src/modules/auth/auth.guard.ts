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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractToken(request);
      if (!token) {
        throw new UnauthorizedException('Plese Sign In');
      }
      await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN,
      });
      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  private extractToken(req: Request): string | undefined {
    const token = req.headers.authorization.split(' ')[1];
    // const [token, type] = req.headers.authorization?.split(' ');
    // return type === 'Bearer' ? token : undefined;
    return token;
  }
}
