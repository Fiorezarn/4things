import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class productDTO {
  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  product_desc: string;

  @IsNotEmpty()
  category_id: string;

  file: string;

  user_id: string;
}

export class createproductDTO extends productDTO {
  created_by: string;
}

export class updateproductDTO extends productDTO {
  updated_by: string;
}
