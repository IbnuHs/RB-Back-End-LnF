import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { AddLocationDTO } from './dto/add.location.dto';
import { UpdateLocationDTO } from './dto/update.location.dto';

@Controller('/api/v1/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  getLocation() {
    return this.locationService.getlocation();
  }

  @Post()
  addLocation(@Body() dto: AddLocationDTO) {
    return this.locationService.AddLocation(dto);
  }

  @Patch('/:id')
  updateLocation(@Body() dto: UpdateLocationDTO, @Param('id') id: number) {
    return this.locationService.updatelocation(dto, id);
  }

  @Delete('/:id')
  deleteLocation(@Param('id') id: number) {
    return this.locationService.deleteLocation(id);
  }
}
