import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entitities/user.entities';
import { Repository } from 'typeorm';
import { registerDTO } from './dto/register.dto';
import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDTO } from './dto/login.dto';
import { throwError } from 'rxjs';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: registerDTO): Promise<Object> {
    try {
      const userExist = await this.user.findOne({
        where: { email: dto.email },
      });
      if (userExist) {
        throw new ConflictException('Email Already Used');
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(dto.password, salt);
      const user = this.user.create({ ...dto, password: hash });
      await this.user.save(user);
      return {
        message: 'User Created Successfully',
        code: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(dto: loginDTO): Promise<Object> {
    try {
      const { email, password } = dto;
      const user = await this.user.findOne({ where: { email } });
      if (!user) throw new UnauthorizedException('Email Atau Password Salah');
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new UnauthorizedException('Email Atau Password Salah');
      const payload = {
        name: user.name,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);
      return {
        token: token,
        status: 201,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
