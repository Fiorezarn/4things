import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class categoryDTO {
  @IsNotEmpty()
  category_name: string;
}

export class createcategoryDTO extends categoryDTO {
  created_by: string;
}

export class updatecategoryDTO extends categoryDTO {
  updated_by: string;
}
