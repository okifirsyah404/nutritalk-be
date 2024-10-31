/* eslint-disable @typescript-eslint/ban-types */

import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthOperationDocs } from '../auth.operation';
import { AuthSignInContentDocs } from '../content/auth-sign-in.content';
import { ApplyDecorators } from '@contract/decorator/apply-decorators.type';

export function AuthSignInDocs(): ApplyDecorators {
  return applyDecorators(
    ApiOperation(AuthOperationDocs.AUTH_SIGN_IN),
    ApiCreatedResponse({
      content: AuthSignInContentDocs.AUTH_SIGN_IN_SUCCESS,
    }),
    ApiBadRequestResponse({
      content: AuthSignInContentDocs.AUTH_SIGN_IN_BAD_REQUEST,
    }),
    ApiUnauthorizedResponse({
      content: AuthSignInContentDocs.AUTH_SIGN_IN_UNAUTHORIZED,
    }),
    ApiNotFoundResponse({
      content: AuthSignInContentDocs.AUTH_SIGN_IN_NOT_FOUND,
    }),
  );
}
