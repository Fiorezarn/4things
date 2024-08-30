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

@Table({ tableName: 'likes' })
export class LikesModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  like_id: number;

  @ForeignKey(() => productModel)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: string;
  @BelongsTo(() => productModel)
  product: productModel;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
  })
  user_id: string;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
