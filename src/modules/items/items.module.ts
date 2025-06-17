import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './Entities/items.entities';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    MulterModule.register({
      storage: diskStorage({}),
    }),
  ],
  providers: [ItemService],
  controllers: [ItemsController],
})
export class ItemsModule {}
