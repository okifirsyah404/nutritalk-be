import { JWTTokenValidationMessage } from "@constant/message";
import { IGoogleSSORequest } from "@contract";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class NutritionistBindGoogleSSORequest implements IGoogleSSORequest {
	@IsJWT({
		message: JWTTokenValidationMessage.ERR_GOOGLE_JWT_TOKEN_MUST_BE_JWT,
	})
	@IsString({
		message: JWTTokenValidationMessage.ERR_GOOGLE_JWT_TOKEN_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: JWTTokenValidationMessage.ERR_GOOGLE_JWT_TOKEN_REQUIRED,
	})
	googleJwtToken: string;
}
