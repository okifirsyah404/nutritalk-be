import { AccountValidationMessage } from "@constant/message";
import { IAccountEntity, IDeviceInfoEntity } from "@contract";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NutritionistAuthSignInRequest
	implements
		Pick<IAccountEntity, "email" | "password">,
		Pick<IDeviceInfoEntity, "fcmToken">
{
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
			message: AccountValidationMessage.ERR_EMAIL_INVALID,
		},
	)
	@IsString({
		message: AccountValidationMessage.ERR_EMAIL_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AccountValidationMessage.ERR_EMAIL_REQUIRED,
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
		message: AccountValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AccountValidationMessage.ERR_PASSWORD_REQUIRED,
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
		message: AccountValidationMessage.ERR_FCM_TOKEN_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AccountValidationMessage.ERR_FCM_TOKEN_REQUIRED,
	})
	fcmToken: string;
}
