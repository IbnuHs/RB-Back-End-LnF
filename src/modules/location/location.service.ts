import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entitites/location.entities';
import { Repository } from 'typeorm';
import { AddLocationDTO } from './dto/add.location.dto';
import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateLocationDTO } from './dto/update.location.dto';

export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly location: Repository<Location>,
  ) {}

  async getlocation(): Promise<Location[]> {
    try {
      const location = await this.location.find();
      if (!location)
        throw new NotFoundException('Belum ada lokasi yang ditambahkan');
      return location;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
  async AddLocation(dto: AddLocationDTO): Promise<object> {
    try {
      const location = await this.location.findOne({
        where: {
          location: dto.location,
        },
      });
      if (
        location &&
        dto.location.toLowerCase() === location.location.toLowerCase()
      ) {
        throw new ConflictException(`Lokasi ${dto.location} Sudah Ada`);
      }
      const newlocation = this.location.create();
      newlocation.location = dto.location;
      await this.location.save(newlocation);
      return {
        message: 'Lokasi Berhasil Ditambahkan',
        status: 201,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updatelocation(dto: UpdateLocationDTO, id: number): Promise<object> {
    try {
      const location = await this.location.findOne({
        where: {
          id: id,
        },
      });
      if (!location)
        throw new NotFoundException(`Lokasi dengan id ${id} Tidak ada`);
      location.location = dto.location;
      await this.location.save(location);
      return {
        message: 'Lokasi Berhasil Diupdate',
        status: 204,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteLocation(id: number): Promise<object> {
    try {
      const location = await this.location.findOne({
        where: {
          id: id,
        },
      });
      if (!location) throw new NotFoundException('Lokasi Tidak Valid');
      await this.location.delete({ id });
      return {
        message: 'Lokasi Berhasil Dihapus',
        status: 204,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
