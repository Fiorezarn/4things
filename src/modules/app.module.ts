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
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductService } from 'src/services/product.service';
import { ProductController } from 'src/controllers/product.controller';
import { ReviewController } from 'src/controllers/review.controller';
import { ReviewService } from 'src/services/review.service';
import { CategoryService } from 'src/services/category.service';
import { CategoryController } from 'src/controllers/category.controller';
import { likesProviders } from 'src/providers/likes.provider';
import { LikesService } from 'src/services/likes.service';
import { LikesController } from 'src/controllers/likes.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/static',
    }),
    DatabaseModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'lvj3lkas82r17kj',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    ProductController,
    ReviewController,
    CategoryController,
    LikesController,
  ],
  providers: [
    AppService,
    UserService,
    ...userProviders,
    ProductService,
    ...productProviders,
    ReviewService,
    ...reviewProviders,
    CategoryService,
    ...categoryProviders,
    LikesService,
    ...likesProviders,
    ResponseHelper,
  ],
})
export class AppModule {}
