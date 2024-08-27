import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class userDTO {
  full_name: string;

  email: string;

  username: string;

  role: string;

  @IsNotEmpty()
  password: string;
}

export class registerUserDTO extends userDTO {
  created_by: string;
}

export class LoginDTO extends userDTO {
  username: string;

  password: string;
}

export class updateUserDTO extends userDTO {
  updated_by: string;
}
