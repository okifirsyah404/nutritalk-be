import { AccountValidationMessage } from "@constant/message";
import { IGoogleSSORequest } from "@contract";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class PatientBindGoogleSSORequest implements IGoogleSSORequest {
	@IsJWT({
		message: AccountValidationMessage.ERR_GOOGLE_JWT_TOKEN_MUST_BE_JWT,
	})
	@IsString({
		message: AccountValidationMessage.ERR_GOOGLE_JWT_TOKEN_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AccountValidationMessage.ERR_GOOGLE_JWT_TOKEN_REQUIRED,
	})
	googleJwtToken: string;
}
