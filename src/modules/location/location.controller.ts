import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { AddLocationDTO } from './dto/add.location.dto';
import { UpdateLocationDTO } from './dto/update.location.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('/api/v1/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @UseGuards(AuthGuard)
  getLocation() {
    return this.locationService.getlocation();
  }

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  addLocation(@Body() dto: AddLocationDTO) {
    return this.locationService.AddLocation(dto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  updateLocation(@Body() dto: UpdateLocationDTO, @Param('id') id: number) {
    return this.locationService.updatelocation(dto, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, RoleGuard)
  deleteLocation(@Param('id') id: number) {
    return this.locationService.deleteLocation(id);
  }
}
