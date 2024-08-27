import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class reviewDTO {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  review_value: string;
}

export class createreviewDTO extends reviewDTO {
  created_by: string;
}

export class updatereviewDTO extends reviewDTO {
  updated_by: string;
}
