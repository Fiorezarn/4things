import { Inject, Injectable } from '@nestjs/common';
import { productModel } from 'src/models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private readonly productRepository,
  ) {}

  async getAllProduct() {
    try {
      return await this.productRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: number) {
    try {
      return await this.productRepository.findOne({
        where: { product_id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product: any): Promise<productModel> {
    try {
      const result = await this.productRepository.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, body: any) {
    try {
      const updateProduct = await this.productRepository.update(body, {
        where: { product_id: id },
      });
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id: id },
      });
      return await product.destroy();
    } catch (error) {
      throw error;
    }
  }
}
