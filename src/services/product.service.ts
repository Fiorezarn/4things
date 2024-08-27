import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private readonly productRepository,
  ) {}

  async getAllProduct() {
    return await this.productRepository.findAll();
  }

  async createProduct(product) {
    return await this.productRepository.create(product);
  }
}
