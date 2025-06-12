import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitities/user.entities';
import { Repository } from 'typeorm';
import { userDTO } from './dto/user.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async register(dto: userDTO) {
    try {
      const userExist = await this.user.findOne({
        where: { email: dto.email },
      });
      if (userExist) {
        throw new ConflictException('Email Already Used');
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(dto.password, salt);
      this.user.create({ ...dto, password: hash });
      return {
        code: 200,
        message: 'User Created Successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
