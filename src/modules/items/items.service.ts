import { DataSource, Repository } from 'typeorm';
import { Item } from './Entities/items.entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { createItemDTO } from './dto/create.item.dto';
import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import path from 'path';
import { error } from 'console';

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

  async editItem() {}

  async deleteItem(id: string): Promise<object> {
    // const query = this.dataSource.createQueryRunner()
    // await query.connect()
    // await query.startTransaction()
    try {
      const item = await this.items.findOne({ where: { id } });
      if (!item) throw new BadRequestException('Id Tidak Valid');
      const fs = await import('fs/promises');
      // if(item.urlImage){
      //   await fs.unlink(item.).catch(() => null)
      // }
      await this.items.delete(item);
      return {
        message: 'Item Berhasil Dihapus',
      };
    } catch (error) {}
  }
}
