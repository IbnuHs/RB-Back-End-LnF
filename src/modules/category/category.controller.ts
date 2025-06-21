import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDTO } from './dto/add.category.dto';
import { EditCategoryDTO } from './dto/edit.category.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('/api/v1/category/')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCategory() {
    return this.categoryService.getCategory();
  }
  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  addCategoty(@Body() dto: AddCategoryDTO) {
    return this.categoryService.addCategory(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  editCategory(
    @Body() dto: EditCategoryDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoryService.editCategory(dto, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
