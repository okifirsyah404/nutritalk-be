import { BaseApiResponse } from "@common";
import { JwtTokenError } from "@constant/message";
import { ExamplesObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

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
