import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { productModel } from './product.entity';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @Column({
    type: DataType.CHAR(255),
    primaryKey: true,
  })
  user_id: string;

  @Column({
    type: DataType.CHAR(255),
  })
  full_name: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    allowNull: true,
    type: DataType.CHAR(255),
  })
  role: string;

  @Column({
    type: DataType.CHAR(255),
  })
  password: string;

  @Column({
    type: DataType.CHAR(32),
  })
  created_by: string;

  @Column({
    type: DataType.CHAR(32),
  })
  updated_by: string;

  @HasMany(() => productModel)
  products: productModel[];
}
