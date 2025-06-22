import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './items.service';
import { createItemDTO } from './dto/create.item.dto';
import {
  Item,
  StatusLaporan,
  StatusPengajuan,
} from './Entities/items.entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateItemDTO } from './dto/update.item.dto';
import { RoleGuard } from '../auth/role.guard';
import { UpdateStatusLaporanDTO } from './dto/update.status.laporan';
import { Request } from 'express';

@Controller('api/v1/item')
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  addItem(
    @Body() dto: createItemDTO,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<object> {
    const userId = req.user.user;
    return this.itemService.addITem(dto, file, userId);
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
    @Req() req: any,
  ): Promise<object> {
    const userId = req.user.user;
    return this.itemService.updateItem(id, dto, userId);
  }

  @Patch(':id/pengajuan')
  @UseGuards(AuthGuard, RoleGuard)
  updateStatusPengajuan(
    @Param('id') id: string,
    @Body() status: { status: StatusPengajuan },
  ) {
    return this.itemService.updateStatusPengajuan(id, status);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard, RoleGuard)
  updateStatusLaporan(
    @Param('id') id: string,
    @Body() dto: UpdateStatusLaporanDTO,
  ) {
    return this.itemService.updateStatusLaporan(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteItem(@Param('id') id: string): Promise<object> {
    return this.itemService.deleteItem(id);
  }
}
