import { IJwtRefreshPayload } from "@jwt/app-jwt";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 *
 * Custom decorator to extract the signature payload from the HTTP request.
 *
 * This decorator uses the `createParamDecorator` function to create a parameter decorator
 * that retrieves the `signature` property from the HTTP request object.
 *
 * @returns {IJwtRefreshPayload} A promise that resolves to the `IJwtRefreshPayload` containing the signature payload.
 *
 */
const GetSignaturePayload = createParamDecorator(
	(data, ctx: ExecutionContext): Promise<IJwtRefreshPayload> => {
		return ctx.switchToHttp().getRequest().signature;
	},
);

export default GetSignaturePayload;
