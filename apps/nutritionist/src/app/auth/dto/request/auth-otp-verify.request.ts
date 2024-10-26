import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthSignInRequest } from './auth-sign-in.request';

export class AuthOtpVerifyRequest extends PickType(AuthSignInRequest, [
  'email',
]) {
  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;
}
