import {
	EmailValidationMessage,
	FcmTokenValidationMessage,
	PasswordValidationMessage,
} from "@constant/message";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthSignInRequest {
	/**
	 *
	 * Email api property.
	 *
	 * Decorators:
	 * - IsEmail
	 * - IsString
	 * - IsNotEmpty
	 *
	 */
	@ApiProperty({
		example: "johndoe@example.com",
	})
	@IsEmail(
		{},
		{
			message: EmailValidationMessage.ERR_EMAIL_INVALID,
		},
	)
	@IsString({
		message: EmailValidationMessage.ERR_EMAIL_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: EmailValidationMessage.ERR_EMAIL_REQUIRED,
	})
	email: string;

	/**
	 *
	 * Password api property.
	 *
	 * Decorators:
	 * - IsString
	 * - IsNotEmpty
	 *
	 */
	@ApiProperty({
		example: "Secret Password",
	})
	@IsString({
		message: PasswordValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: PasswordValidationMessage.ERR_PASSWORD_REQUIRED,
	})
	password: string;

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
