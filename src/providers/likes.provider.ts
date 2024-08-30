import { LikesModel } from 'src/models/likes.entity';

export const likesProviders = [
  {
    provide: 'LIKES_REPOSITORY',
    useValue: LikesModel,
  },
];
