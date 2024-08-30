import { Inject, Injectable } from '@nestjs/common';
import { productModel } from 'src/models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private readonly productRepository,
  ) {}

  async getAllProduct() {
    try {
      const data = await this.productRepository.sequelize.query(
        `SELECT p.*, u.username, c.category_name  FROM product p 
        LEFT JOIN users u ON u.user_id  = p.user_id
        LEFT JOIN category c ON p.category_id = c.category_id`,
      );

      return data[0];
    } catch (error) {
      throw error;
    }
  }

  async getTrendingProduct() {
    try {
      const data = await this.productRepository.sequelize.query(
        `SELECT p.*, u.username, c.category_name, COUNT(l.like_id) AS total_like  
          FROM product p 
          LEFT JOIN users u ON u.user_id = p.user_id
          LEFT JOIN category c ON p.category_id = c.category_id
          LEFT JOIN likes l ON l.product_id = p.product_id
          GROUP BY p.product_id, u.username, c.category_name
          ORDER BY total_like DESC;`,
      );

      return data[0];
    } catch (error) {
      throw error;
    }
  }

  async getProductByUser(id: number) {
    try {
      const data = await this.productRepository.sequelize.query(
        `SELECT p.*, u.username, c.category_name  
        FROM product p 
        LEFT JOIN users u ON u.user_id = p.user_id
        LEFT JOIN category c ON p.category_id = c.category_id
        WHERE u.user_id = "${id}"`,
      );

      return data[0];
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
