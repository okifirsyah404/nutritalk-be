import {
	FcmTokenValidationMessage,
	JWTTokenValidationMessage,
} from "@constant/message";
import { IGoogleSSORequest } from "@contract";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PatientAuthSsoGoogleRequest implements IGoogleSSORequest {
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
		message: FcmTokenValidationMessage.ERR_FCM_TOKEN_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: FcmTokenValidationMessage.ERR_FCM_TOKEN_REQUIRED,
	})
	fcmToken: string;
}
