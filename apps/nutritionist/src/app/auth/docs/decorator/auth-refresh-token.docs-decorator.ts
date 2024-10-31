import { ApplyDecorators } from '@contract/decorator/apply-decorators.type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthOperationDocs } from '../auth.operation';
import { AuthRefreshTokenContent } from '../content/auth-refresh-token.content';

export function AuthRefreshTokenDocs(): ApplyDecorators {
  return applyDecorators(
    ApiOperation(AuthOperationDocs.AUTH_REFRESH_TOKEN),
    ApiCreatedResponse({
      content: AuthRefreshTokenContent.AUTH_REFRESH_TOKEN_SUCCESS,
    }),
    ApiUnauthorizedResponse({
      content: AuthRefreshTokenContent.AUTH_REFRESH_TOKEN_UNAUTHORIZED,
    }),
    ApiHeader({
      name: 'x-refresh-token',
      required: true,
      description:
        'The refresh token to be used for refreshing the access token.',
    }),
  );
}
