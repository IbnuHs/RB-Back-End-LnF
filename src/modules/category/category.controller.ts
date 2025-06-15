import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDTO } from './dto/add.category.dto';
import { EditCategoryDTO } from './dto/edit.category.dto';

@Controller('/api/v1/category/')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategory() {
    return this.categoryService.getCategory();
  }
  @Post()
  addCategoty(@Body() dto: AddCategoryDTO) {
    return this.categoryService.addCategory(dto);
  }

  @Patch(':id')
  editCategory(
    @Body() dto: EditCategoryDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoryService.editCategory(dto, id);
  }

  @Delete()
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
