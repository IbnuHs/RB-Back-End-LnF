import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './Entities/items.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService],
  controllers: [ItemsController],
})
export class ItemsModule {}
