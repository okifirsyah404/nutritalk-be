import { AccountValidationMessage } from "@constant/message";
import { IGoogleSSORequest } from "@contract";
import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class PatientAuthSsoGoogleRequest implements IGoogleSSORequest {
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

	/**
	 *
	 * Fcm token api property.
	 *
	 * Decorators:
	 * - IsString
	 * - IsNotEmpty
	 *
	 */
	@ApiProperty({
		example: "fcmToken",
	})
	@IsString({
		message: AccountValidationMessage.ERR_FCM_TOKEN_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AccountValidationMessage.ERR_FCM_TOKEN_REQUIRED,
	})
	fcmToken: string;
}
