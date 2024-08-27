import { Inject, Injectable } from '@nestjs/common';
import { reviewModel } from 'src/models/review.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY') private readonly categoryRepository,
  ) {}

  async getAllCategory(): Promise<reviewModel[]> {
    try {
      const data = await this.categoryRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id: number): Promise<reviewModel> {
    try {
      const data = await this.categoryRepository.findOne({
        where: { category_id: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(category: any): Promise<reviewModel> {
    try {
      const data = await this.categoryRepository.create(category);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: number): Promise<reviewModel> {
    try {
      const data = await this.categoryRepository.destroy({
        where: { category_id: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: number, category: any): Promise<reviewModel> {
    try {
      const data = await this.categoryRepository.update(category, {
        where: { category_id: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
