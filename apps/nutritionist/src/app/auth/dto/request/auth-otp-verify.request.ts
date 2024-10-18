import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthSignInRequest } from './auth-sign-in.request';

export class AuthOtpVerifyRequest extends PickType(AuthSignInRequest, [
  'email',
]) {
  @IsString()
  @IsNotEmpty()
  otp: string;
}
