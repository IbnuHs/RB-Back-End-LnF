import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { createItemDTO } from './dto/create.item.dto';
import { Item } from './Entities/items.entities';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/item')
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  addItem(
    @Body() dto: createItemDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<object> {
    return this.itemService.addITem(dto, file);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.itemService.uploadImage(file);
  }
  @Get()
  getItem(): Promise<object> {
    return this.itemService.getItem();
  }
}
