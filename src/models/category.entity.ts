import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { productModel } from './product.entity';

@Table({ tableName: 'category' })
export class categoryModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  category_id: number;

  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
    unique: true,
  })
  category_name: string;

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
