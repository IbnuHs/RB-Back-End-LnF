import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entitites/location.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
