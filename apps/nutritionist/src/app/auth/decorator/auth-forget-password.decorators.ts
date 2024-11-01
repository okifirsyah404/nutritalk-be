import { ApplyDecorators } from '@contract/decorator/apply-decorators.type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthOperationDocs } from '../docs/auth.operation';
import { AuthForgetPasswordContent } from '../docs/content/auth-forget-password.content';

/**
 * Decorator function for handling the API documentation and responses
 * for the "Request OTP for Forget Password" operation.
 *
 * This function applies the following decorators:
 * - `ApiOperation` to document the operation.
 * - `ApiBadRequestResponse` to document the response when the request is invalid.
 * - `ApiNotFoundResponse` to document the response when the account is not found.
 * - `ApiCreatedResponse` to document the response when the OTP request is successful.
 *
 * @returns {ApplyDecorators} The combined decorators for the operation.
 */
export function AuthRequestOtpForgetPasswordDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiOperation(AuthOperationDocs.AUTH_REQUEST_OTP_FORGET_PASSWORD),
    ApiBadRequestResponse({
      content:
        AuthForgetPasswordContent.AUTH_REQUEST_OTP_FORGET_PASSWORD_BAD_REQUEST,
    }),
    ApiNotFoundResponse({
      content: AuthForgetPasswordContent.AUTH_ACCOUNT_NOT_FOUND,
    }),
    ApiCreatedResponse({
      content:
        AuthForgetPasswordContent.AUTH_REQUEST_OTP_FORGET_PASSWORD_SUCCESS,
    }),
  );
}

/**
 * A decorator function that applies multiple decorators to handle the
 * verification of OTP for the forget password functionality.
 *
 * @returns {ApplyDecorators} - A function that applies the specified decorators.
 *
 * The applied decorators include:
 * - `ApiOperation`: Documents the operation for verifying OTP during the forget password process.
 * - `ApiBadRequestResponse`: Documents the response for a bad request scenario during OTP verification.
 * - `ApiCreatedResponse`: Documents the response for a successful OTP verification.
 */
export function AuthVerifyOtpForgetPasswordDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiOperation(AuthOperationDocs.AUTH_VERIFY_OTP_FORGET_PASSWORD),
    ApiBadRequestResponse({
      content:
        AuthForgetPasswordContent.AUTH_VERIFY_OTP_FORGET_PASSWORD_BAD_REQUEST,
    }),
    ApiCreatedResponse({
      content:
        AuthForgetPasswordContent.AUTH_VERIFY_OTP_FORGET_PASSWORD_SUCCESS,
    }),
  );
}

/**
 * A decorator function that applies multiple decorators to handle the reset password operation.
 *
 * @returns {ApplyDecorators} - A function that applies the following decorators:
 *
 * - `ApiOperation`: Describes the reset password operation.
 * - `ApiCreatedResponse`: Specifies the response content for a successful reset password operation.
 * - `ApiBadRequestResponse`: Specifies the response content for a bad request during the reset password operation.
 * - `ApiUnauthorizedResponse`: Specifies the response content for an unauthorized reset password operation.
 * - `ApiNotFoundResponse`: Specifies the response content when the account is not found during the reset password operation.
 */
export function AuthResetPasswordDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiOperation(AuthOperationDocs.AUTH_RESET_PASSWORD),
    ApiCreatedResponse({
      content: AuthForgetPasswordContent.AUTH_RESET_PASSWORD_SUCCESS,
    }),
    ApiBadRequestResponse({
      content: AuthForgetPasswordContent.AUTH_RESET_PASSWORD_BAD_REQUEST,
    }),
    ApiUnauthorizedResponse({
      content: AuthForgetPasswordContent.AUTH_RESET_PASSWORD_UNAUTHORIZED,
    }),
    ApiNotFoundResponse({
      content: AuthForgetPasswordContent.AUTH_ACCOUNT_NOT_FOUND,
    }),
  );
}
