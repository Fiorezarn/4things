import { UserModel } from 'src/models/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserModel,
  },
];
