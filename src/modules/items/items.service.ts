import { Repository } from 'typeorm';
import { Item } from './Entities/items.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { createItemDTO } from './dto/create.item.dto';
import { InternalServerErrorException } from '@nestjs/common';

export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly items: Repository<Item>,
  ) {}

  async addITem(dto: createItemDTO): Promise<object> {
    try {
      const item = this.items.create(dto);
      await this.items.save(item);
      return {
        message: 'Barang Berhasil ditambahkan',
        status: 201,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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

  // async editItem()

  async editItem() {}
}
