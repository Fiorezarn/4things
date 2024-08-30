import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';
import { categoryModel } from './category.entity';
import { reviewModel } from './review.entity';

@Table({ tableName: 'product' })
export class productModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  product_id: number;

  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
  })
  product_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  product_desc: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @Column({
    type: DataType.CHAR(255),
    allowNull: true,
  })
  file: string;

  @Column({
    type: DataType.CHAR(32),
  })
  created_by: string;

  @Column({
    type: DataType.CHAR(32),
  })
  updated_by: string;

  @HasMany(() => reviewModel)
  review: reviewModel[];
}
