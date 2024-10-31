import { BaseApiResponse } from '@common/response/api.response';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AuthForgetPasswordSuccessMessage } from 'apps/nutritionist/src/common/constant/message/success/auth-forget-password-success.message';
import { AuthForgetPasswordResponse } from '../../dto/response/auth-forget-password.response';

export class AuthRequestOtpForgetPasswordContent {
  static readonly AUTH_REQUEST_OTP_FORGET_PASSWORD_SUCCESS: ContentObject = {
    'application/json': {
      example: {
        message: BaseApiResponse.created({
          message: AuthForgetPasswordSuccessMessage.SUCCESS_SEND_OTP_TO_EMAIL,
          data: AuthForgetPasswordResponse.exampleData,
        }),
      },
    },
  };
}
