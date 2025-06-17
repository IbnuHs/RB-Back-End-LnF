import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './items.service';
import { createItemDTO } from './dto/create.item.dto';
import { Item } from './Entities/items.entities';

@Controller('api/v1/item')
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  addItem(@Body() dto: createItemDTO): Promise<object> {
    return this.itemService.addITem(dto);
  }

  @Get()
  getItem(): Promise<object> {
    return this.itemService.getItem();
  }
}
