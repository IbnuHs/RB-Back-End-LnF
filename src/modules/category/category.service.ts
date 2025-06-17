import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entitites';
import { Repository } from 'typeorm';
import { AddCategoryDTO } from './dto/add.category.dto';
import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EditCategoryDTO } from './dto/edit.category.dto';

export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private readonly category: Repository<Categories>,
  ) {}

  async getCategory(): Promise<Categories[]> {
    try {
      const kategori = await this.category.find();
      if (!kategori) {
        throw new NotFoundException('Kategori belum ditambahkan');
      }
      return kategori;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async addCategory(dto: AddCategoryDTO): Promise<object> {
    try {
      const category = await this.category.findOne({
        where: {
          category: dto.category,
        },
      });
      if (category) {
        throw new ConflictException(`Kategori ${dto.category} Sudah Ada`);
      }
      const newCategory = this.category.create(dto);
      await this.category.save(newCategory);

      return {
        message: 'Kategori Berhasil Ditambahkan',
        status: 201,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async editCategory(dto: EditCategoryDTO, id: number): Promise<Object> {
    try {
      const kategori = await this.category.findOne({
        where: {
          id: id,
        },
      });
      if (!kategori) {
        throw new NotFoundException('Kategori Tidak Ditemukan');
      }
      kategori.category = dto.category;
      await this.category.save(kategori);
      return {
        message: 'Kategori Berhasil Diubah',
        status: 200,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteCategory(id: number): Promise<object> {
    try {
      const kategori = await this.category.findOne({
        where: {
          id: id,
        },
      });

      if (!kategori) {
        throw new NotFoundException('Kategori Tidak Ditemukan');
      }
      await this.category.delete({ id });
      return {
        message: 'Kategori Berhasil Dihapus',
        status: 200,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
