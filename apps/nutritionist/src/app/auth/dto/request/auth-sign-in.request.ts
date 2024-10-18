import { ApiProperty } from '@nestjs/swagger';
import { EmailValidationMessage } from 'apps/nutritionist/src/common/constant/message/validation/email-validation.message';
import { FcmTokenValidationMessage } from 'apps/nutritionist/src/common/constant/message/validation/fcm-token-validation.message';
import { PasswordValidationMessage } from 'apps/nutritionist/src/common/constant/message/validation/password-validation.message';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInRequest {
  @ApiProperty({
    example: 'johndoe@example.com',
  })
  @IsEmail(
    {},
    {
      message: EmailValidationMessage.ERR_EMAIL_INVALID,
    },
  )
  @IsString({
    message: EmailValidationMessage.ERR_EMAIL_MUST_BE_STRING,
  })
  @IsNotEmpty({
    message: EmailValidationMessage.ERR_EMAIL_REQUIRED,
  })
  email: string;

  @ApiProperty({
    example: 'Secret Password',
  })
  @IsString({
    message: PasswordValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
  })
  @IsNotEmpty({
    message: PasswordValidationMessage.ERR_PASSWORD_REQUIRED,
  })
  password: string;

  @ApiProperty({
    example: 'fcmToken',
  })
  @IsString({
    message: FcmTokenValidationMessage.ERR_FCM_TOKEN_MUST_BE_STRING,
  })
  @IsNotEmpty({
    message: FcmTokenValidationMessage.ERR_FCM_TOKEN_REQUIRED,
  })
  fcmToken: string;
}
