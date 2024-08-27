import { reviewModel } from 'src/models/review.entity';

export const reviewProviders = [
  {
    provide: 'REVIEW_REPOSITORY',
    useValue: reviewModel,
  },
];
