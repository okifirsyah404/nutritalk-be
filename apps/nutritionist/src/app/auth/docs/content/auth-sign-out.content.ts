import { BaseApiResponse } from '@common/common';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { INVALID_TOKEN_CONTENT } from 'apps/nutritionist/src/common/constant/docs/invalid-token-content.constant';
import { AuthErrorMessage } from 'apps/nutritionist/src/common/constant/message/error/auth-error.message';
import { AuthSuccessMessage } from 'apps/nutritionist/src/common/constant/message/success/auth-success.message';

export abstract class AuthSignOutContentDocs {
  static readonly AUTH_SIGN_OUT_SUCCESS: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_OUT,
        data: undefined,
      }),
    },
  };

  static readonly AUTH_SIGN_OUT_UNAUTHORIZED: ContentObject = {
    'application/json': {
      examples: {
        'Already Signed Out': {
          value: BaseApiResponse.unauthorized({
            message: AuthErrorMessage.ERR_ACCOUNT_ALREADY_SIGN_OUT,
          }),
        },
        ...INVALID_TOKEN_CONTENT,
      },
    },
  };
}
