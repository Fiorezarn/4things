import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';

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
    allowNull: false,
  })
  review_value: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.CHAR(255),
    allowNull: false,
  })
  user_id: number;
  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({
    type: DataType.CHAR(32),
  })
  created_by: string;

  @Column({
    type: DataType.CHAR(32),
  })
  updated_by: string;
}
