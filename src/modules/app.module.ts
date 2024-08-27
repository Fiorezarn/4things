import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { userProviders } from 'src/providers/user.providers';
import { DatabaseModule } from './database.module';
import { productProviders } from 'src/providers/product.provider';
import { reviewProviders } from 'src/providers/review.provider';
import { categoryProviders } from 'src/providers/category.provider';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { ResponseHelper } from 'src/helpers/response.helpers';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'lvj3lkas82r17kj',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    ...userProviders,
    ...productProviders,
    ...reviewProviders,
    ...categoryProviders,
    ResponseHelper,
  ],
})
export class AppModule {}
