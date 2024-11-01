import { ApplyDecorators } from '@contract/decorator/apply-decorators.type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthOperationDocs } from '../docs/auth.operation';
import { AuthContentDocs } from '../docs/content/auth.content';

export function AuthSignInDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiOperation(AuthOperationDocs.AUTH_SIGN_IN),
    ApiCreatedResponse({
      content: AuthContentDocs.AUTH_SIGN_IN_SUCCESS,
    }),
    ApiBadRequestResponse({
      content: AuthContentDocs.AUTH_SIGN_IN_BAD_REQUEST,
    }),
    ApiUnauthorizedResponse({
      content: AuthContentDocs.AUTH_SIGN_IN_UNAUTHORIZED,
    }),
    ApiNotFoundResponse({
      content: AuthContentDocs.AUTH_NOT_FOUND,
    }),
  );
}

export function AuthRefreshTokenDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiOperation(AuthOperationDocs.AUTH_REFRESH_TOKEN),
    ApiCreatedResponse({
      content: AuthContentDocs.AUTH_REFRESH_TOKEN_SUCCESS,
    }),
    ApiUnauthorizedResponse({
      content: AuthContentDocs.AUTH_UNAUTHORIZED,
    }),
    ApiHeader({
      name: 'x-refresh-token',
      required: true,
      description:
        'The refresh token to be used for refreshing the access token.',
    }),
  );
}

export function AuthSignOutDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(AuthOperationDocs.AUTH_SIGN_OUT),
    ApiOkResponse({
      content: AuthContentDocs.AUTH_SIGN_OUT_SUCCESS,
    }),
    ApiUnauthorizedResponse({
      content: AuthContentDocs.AUTH_SIGN_OUT_UNAUTHORIZED,
    }),
  );
}
