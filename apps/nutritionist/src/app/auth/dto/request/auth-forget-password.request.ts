import { IsNotEmpty, IsString } from 'class-validator';

export class AuthForgetPasswordRequest {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  signature: string;
}
