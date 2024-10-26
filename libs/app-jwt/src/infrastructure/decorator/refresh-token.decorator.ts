import { IJwtRefresh } from '@jwt/app-jwt';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const RefreshToken = createParamDecorator(
  (data, ctx: ExecutionContext): Promise<IJwtRefresh> => {
    return ctx.switchToHttp().getRequest().refreshTokenPayload;
  },
);

export default RefreshToken;
