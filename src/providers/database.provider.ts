import { Sequelize } from 'sequelize-typescript';
import { categoryModel } from 'src/models/category.entity';
import { LikesModel } from 'src/models/likes.entity';
import { productModel } from 'src/models/product.entity';
import { reviewModel } from 'src/models/review.entity';
import { UserModel } from 'src/models/user.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOSTNAME,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      sequelize.addModels([
        UserModel,
        productModel,
        reviewModel,
        categoryModel,
        LikesModel,
      ]);
      await sequelize.sync({
        // alter: true,
        // force: true,
        alter: process.env.APP_MODE == 'production' ? false : true,
      });

      return sequelize;
    },
  },
];
