import { BaseApiResponse } from '@common/common';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { INVALID_TOKEN_CONTENT } from 'apps/nutritionist/src/common/constant/docs/invalid-token-content.constant';
import { AuthSuccessMessage } from 'apps/nutritionist/src/common/constant/message/success/auth-success.message';
import { AuthSignInResponse } from '../../dto/response/auth-sign-in.response';

export abstract class AuthRefreshTokenContent {
  static readonly AUTH_REFRESH_TOKEN_SUCCESS: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: AuthSuccessMessage.SUCCESS_AUTH_REFRESH_TOKEN,
        data: AuthSignInResponse.exampleData,
      }),
    },
  };

  static readonly AUTH_REFRESH_TOKEN_UNAUTHORIZED: ContentObject = {
    'application/json': {
      examples: {
        ...INVALID_TOKEN_CONTENT,
      },
    },
  };
}
