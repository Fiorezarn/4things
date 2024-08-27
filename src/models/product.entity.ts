import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';

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
    type: DataType.CHAR(255),
    allowNull: false,
  })
  product_desc: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID, // Gunakan tipe data UUID yang sama
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
  })
  pruduct_image: string;

  @Column({
    type: DataType.CHAR(32),
  })
  created_by: string;

  @Column({
    type: DataType.CHAR(32),
  })
  updated_by: string;
}
