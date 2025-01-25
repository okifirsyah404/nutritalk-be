import { IJwtRefresh } from "@contract";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RefreshToken = createParamDecorator(
	(data, ctx: ExecutionContext): Promise<IJwtRefresh> => {
		return ctx.switchToHttp().getRequest().refreshTokenPayload;
	},
);
