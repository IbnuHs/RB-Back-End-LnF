import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './Entities/items.entities';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { OwnerItems } from '../owner/owner.entities';
import { User } from '../user/entitities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, OwnerItems, User]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), 'images'),
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  providers: [ItemService],
  controllers: [ItemsController],
})
export class ItemsModule {}
