import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';
import { productModel } from './product.entity';

@Table({ tableName: 'review' })
export class reviewModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  review_id: number;

  @Column({
    type: DataType.TEXT,
  })
  review_value: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
  })
  user_id: number;
  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => productModel)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
  @BelongsTo(() => productModel)
  product: productModel;

  @Column({
    type: DataType.CHAR(32),
  })
  created_by: string;

  @Column({
    type: DataType.CHAR(32),
  })
  updated_by: string;
}
