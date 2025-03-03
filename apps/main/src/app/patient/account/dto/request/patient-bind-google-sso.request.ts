import { IGoogleSSORequest } from "@contract";
import { JWTTokenValidationMessage } from "@constant/message";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class PatientBindGoogleSSORequest implements IGoogleSSORequest {
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
