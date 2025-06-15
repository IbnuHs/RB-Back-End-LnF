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

  async addITem(dto: createItemDTO) {
    try {
      const item = this.items.create(dto);
      await this.items.save(item);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
