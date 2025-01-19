import { BaseApiResponse } from "@common/response/base-api.response";
import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { JwtTokenError } from "../message/error/jwt-token-error.message";

export const INVALID_TOKEN_CONTENT: ExamplesObject = {
	"Expired Token": {
		value: BaseApiResponse.unauthorized({
			message: JwtTokenError.ERR_TOKEN_EXPIRED,
		}),
	},
	"Invalid Token": {
		value: BaseApiResponse.unauthorized({
			message: JwtTokenError.ERR_TOKEN_INVALID,
		}),
	},
	"Unauthorized Token": {
		value: BaseApiResponse.unauthorized({
			message: JwtTokenError.ERR_TOKEN_UNAUTHORIZED,
		}),
	},
};
