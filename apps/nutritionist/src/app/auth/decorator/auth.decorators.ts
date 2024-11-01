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

/**
 * A decorator function that applies multiple decorators related to the
 * authentication sign-in process. This function uses the `applyDecorators`
 * utility to combine several Swagger decorators for API documentation.
 *
 * The applied decorators include:
 * - `ApiOperation`: Describes the operation for authentication sign-in.
 * - `ApiCreatedResponse`: Documents the response for a successful sign-in.
 * - `ApiBadRequestResponse`: Documents the response for a bad request during sign-in.
 * - `ApiUnauthorizedResponse`: Documents the response for unauthorized access during sign-in.
 * - `ApiNotFoundResponse`: Documents the response when the requested resource is not found.
 *
 * @returns {ApplyDecorators} The combined decorators for the authentication sign-in process.
 */
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

/**
 * A decorator function that applies multiple decorators related to the refresh token authentication process.
 *
 * @returns {ApplyDecorators} A function that applies the following decorators:
 * - `ApiOperation`: Describes the operation for refreshing the authentication token.
 * - `ApiCreatedResponse`: Documents the successful response content for the refresh token operation.
 * - `ApiUnauthorizedResponse`: Documents the unauthorized response content for the refresh token operation.
 * - `ApiHeader`: Specifies the required header for the refresh token.
 *
 * The `x-refresh-token` header is required and should contain the refresh token to be used for refreshing the access token.
 */
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

/**
 * A decorator function that applies multiple decorators related to the sign-out operation.
 *
 * @returns {ApplyDecorators} A function that applies the following decorators:
 * - `ApiBearerAuth()`: Indicates that the endpoint requires a bearer token for authentication.
 * - `ApiOperation(AuthOperationDocs.AUTH_SIGN_OUT)`: Describes the sign-out operation.
 * - `ApiOkResponse({ content: AuthContentDocs.AUTH_SIGN_OUT_SUCCESS })`: Specifies the response content for a successful sign-out.
 * - `ApiUnauthorizedResponse({ content: AuthContentDocs.AUTH_SIGN_OUT_UNAUTHORIZED })`: Specifies the response content for an unauthorized sign-out attempt.
 */
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
