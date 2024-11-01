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
