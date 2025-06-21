import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { createItemDTO } from './dto/create.item.dto';
import { Item, StatusPengajuan } from './Entities/items.entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateItemDTO } from './dto/update.item.dto';

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

  @Get(':id')
  @UseGuards(AuthGuard)
  getDetailITems(@Param('id') id: string): Promise<object> {
    return this.itemService.getItemDetail(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateItem(
    @Param('id') id: string,
    @Body() dto: UpdateItemDTO,
  ): Promise<object> {
    return this.itemService.updateItem(id, dto);
  }

  @Patch(':id/pengajuan')
  updateStatusPengajuan(
    @Param('id') id: string,
    @Body() status: { status: StatusPengajuan },
  ) {
    // console.log(status);
    return this.itemService.updateStatusPengajuan(id, status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteItem(@Param('id') id: string): Promise<object> {
    return this.itemService.deleteItem(id);
  }
}
