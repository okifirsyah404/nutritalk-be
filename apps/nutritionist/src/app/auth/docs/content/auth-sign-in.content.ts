import { BaseApiResponse } from '@common/response/api.response';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AuthErrorMessage } from 'apps/nutritionist/src/common/constant/message/error/auth-error.message';
import { AuthSuccessMessage } from 'apps/nutritionist/src/common/constant/message/success/auth-success.message';
import { EmailValidationMessage } from 'apps/nutritionist/src/common/constant/message/validation/email-validation.message';
import { FcmTokenValidationMessage } from 'apps/nutritionist/src/common/constant/message/validation/fcm-token-validation.message';
import { PasswordValidationMessage } from 'apps/nutritionist/src/common/constant/message/validation/password-validation.message';
import { AuthSignInResponse } from '../../dto/response/auth-sign-in.response';

export abstract class AuthSignInContentDocs {
  static readonly AUTH_SIGN_IN_SUCCESS: ContentObject = {
    'application/json': {
      example: BaseApiResponse.created({
        message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_IN,
        data: AuthSignInResponse.exampleData,
      }),
    },
  };

  static readonly AUTH_SIGN_IN_BAD_REQUEST: ContentObject = {
    'application/json': {
      examples: {
        'Email Required': {
          value: BaseApiResponse.badRequest({
            message: EmailValidationMessage.ERR_EMAIL_REQUIRED,
          }),
        },
        'Email Must Be String': {
          value: BaseApiResponse.badRequest({
            message: EmailValidationMessage.ERR_EMAIL_MUST_BE_STRING,
          }),
        },
        'Email Invalid': {
          value: BaseApiResponse.badRequest({
            message: EmailValidationMessage.ERR_EMAIL_INVALID,
          }),
        },
        'Password Required': {
          value: BaseApiResponse.badRequest({
            message: PasswordValidationMessage.ERR_PASSWORD_REQUIRED,
          }),
        },
        'Password Must Be String': {
          value: BaseApiResponse.badRequest({
            message: PasswordValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
          }),
        },
        'FCM Token Required': {
          value: BaseApiResponse.badRequest({
            message: FcmTokenValidationMessage.ERR_FCM_TOKEN_REQUIRED,
          }),
        },
        'FCM Token Must Be String': {
          value: BaseApiResponse.badRequest({
            message: FcmTokenValidationMessage.ERR_FCM_TOKEN_MUST_BE_STRING,
          }),
        },
      },
    },
  };

  static readonly AUTH_SIGN_IN_UNAUTHORIZED: ContentObject = {
    'application/json': {
      examples: {
        'Account Not Nutritionist': {
          value: BaseApiResponse.unauthorized({
            message: AuthErrorMessage.ERR_ACCOUNT_NOT_NUTRITIONIST,
          }),
        },
        'Password Not Match': {
          value: BaseApiResponse.unauthorized({
            message: AuthErrorMessage.ERR_PASSWORD_NOT_MATCH,
          }),
        },
      },
    },
  };

  static readonly AUTH_SIGN_IN_NOT_FOUND: ContentObject = {
    'application/json': {
      example: BaseApiResponse.notFound({
        message: AuthErrorMessage.ERR_ACCOUNT_NOT_FOUND,
      }),
    },
  };
}
