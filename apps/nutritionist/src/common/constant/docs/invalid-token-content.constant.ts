import { BaseApiResponse } from '@common/response/api.response';
import { ExamplesObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AuthErrorMessage } from '../message/error/auth-error.message';

export const INVALID_TOKEN_CONTENT: ExamplesObject = {
  'Expired Token': {
    value: BaseApiResponse.unauthorized({
      message: AuthErrorMessage.ERR_TOKEN_EXPIRED,
    }),
  },
  'Invalid Token': {
    value: BaseApiResponse.unauthorized({
      message: AuthErrorMessage.ERR_TOKEN_INVALID,
    }),
  },
  'Unauthorized Token': {
    value: BaseApiResponse.unauthorized({
      message: AuthErrorMessage.ERR_TOKEN_UNAUTHORIZED,
    }),
  },
};
