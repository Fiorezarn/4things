import { productModel } from 'src/models/product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useValue: productModel,
  },
];
