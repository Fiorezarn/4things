import { categoryModel } from 'src/models/category.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: categoryModel,
  },
];
