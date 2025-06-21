import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { createItemDTO } from './dto/create.item.dto';
import { Item } from './Entities/items.entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/v1/item')
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  addItem(
    @Body() dto: createItemDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<object> {
    return this.itemService.addITem(dto, file);
  }

  @Get()
  @UseGuards(AuthGuard)
  getItem(): Promise<object> {
    return this.itemService.getItem();
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): Promise<object> {
    return this.itemService.deleteItem(id);
  }
}
