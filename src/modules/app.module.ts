import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { userProviders } from 'src/providers/user.providers';
import { DatabaseModule } from './database.module';
import { productProviders } from 'src/providers/product.provider';
import { reviewProviders } from 'src/providers/review.provider';
import { categoryProviders } from 'src/providers/category.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    ...userProviders,
    ...productProviders,
    ...reviewProviders,
    ...categoryProviders,
  ],
})
export class AppModule {}
