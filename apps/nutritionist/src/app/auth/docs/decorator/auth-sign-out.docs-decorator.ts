import { ApplyDecorators } from '@contract/contract/decorator/apply-decorators.type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthOperationDocs } from '../auth.operation';
import { AuthSignOutContentDocs } from '../content/auth-sign-out.content';

export function AuthSignOutDocs(): ApplyDecorators {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(AuthOperationDocs.AUTH_SIGN_OUT),
    ApiOkResponse({
      content: AuthSignOutContentDocs.AUTH_SIGN_OUT_SUCCESS,
    }),
    ApiUnauthorizedResponse({
      content: AuthSignOutContentDocs.AUTH_SIGN_OUT_UNAUTHORIZED,
    }),
  );
}
