import { DataSource, Repository } from 'typeorm';
import {
  Item,
  StatusLaporan,
  StatusPengajuan,
} from './Entities/items.entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { createItemDTO } from './dto/create.item.dto';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import path from 'path';
import { Console, error } from 'console';
import { UpdateItemDTO } from './dto/update.item.dto';

export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly items: Repository<Item>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async addITem(
    dto: createItemDTO,
    file: Express.Multer.File,
  ): Promise<object> {
    const query = this.dataSource.createQueryRunner();
    await query.connect();
    await query.startTransaction();
    try {
      if (!file) throw new BadRequestException('No file Uploaded');
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('Invalid File Type');
      }
      const item = this.items.create(dto);
      item.urlImage = file.path;
      await this.items.save(item);
      await query.manager.save(item);
      await query.commitTransaction();
      return {
        message: 'Barang Berhasil ditambahkan',
        status: 201,
      };
    } catch (error) {
      await query.rollbackTransaction();
      if (error instanceof HttpException) throw error;
      if (file?.path) {
        const fs = await import('fs/promises');
        fs.unlink(file.path).catch(() => null);
      }
      throw new InternalServerErrorException(error.message);
    } finally {
      await query.release();
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      return file.path;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getItem(): Promise<object> {
    try {
      const items = await this.items.find();
      return {
        data: items,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getItemDetail(id: string): Promise<object> {
    try {
      const items = await this.items.findOne({
        where: { id },
        relations: ['location', 'category', 'owner'],
      });
      if (!items) throw new BadRequestException('Invalid Id');
      return {
        data: items,
        status: 200,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateItem(id: string, dto: UpdateItemDTO): Promise<object> {
    try {
      const items = await this.items.findOne({
        where: { id },
      });
      if (!items) throw new NotFoundException('Invalid id');
      items.itemName = dto.itemName;
      items.category = dto.category;
      items.itemDescription = dto.description;
      items.location = dto.location;
      items.jenisLaporan = dto.jenisLaporan;
      items.updatedAt = new Date();

      await this.items.save(items);
      return {
        message: 'Item Berhasil di Update',
        status: 204,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateStatusPengajuan(
    id: string,
    status: { status: StatusPengajuan },
  ): Promise<object> {
    try {
      const items = await this.items.findOne({ where: { id } });
      if (!items) throw new NotFoundException('Invalid Id');
      items.statusPengajuan = status.status;
      await this.items.save(items);
      return {
        message: 'Berhasil Mengupdate Status Pengajuan',
        status: 204,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateStatusLaporan(
    id: string,
    body: { status: StatusLaporan },
  ): Promise<object> {
    try {
      const items = await this.items.findOne({ where: { id } });
      if (!items) throw new NotFoundException('Invalid id');
      items.statusLaporan = body.status;
      await this.items.save(items);
      return {
        message: 'Berhasil Mengupdate Status Laporan',
        status: 204,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteItem(id: string): Promise<object> {
    const query = this.dataSource.createQueryRunner();
    await query.connect();
    await query.startTransaction();
    try {
      const item = await query.manager.findOne(Item, { where: { id: id } });
      if (!item) throw new NotFoundException('Id Tidak Valid');
      const fs = await import('fs/promises');
      await query.manager.delete(Item, id);
      await query.commitTransaction();
      if (item.urlImage) {
        await fs.unlink(item.urlImage).catch(() => null);
      }
      return {
        message: 'Item Berhasil Dihapus',
      };
    } catch (error) {
      await query.rollbackTransaction();
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
