import { AccountValidationMessage } from "@constant/message";
import { IOtpVerifyRequest } from "@contract";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NutritionistChangePasswordVerifyOtpRequest
	implements IOtpVerifyRequest
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
	 * Otp api property.
	 *
	 * Decorators:
	 * - IsString
	 * - IsNotEmpty
	 *
	 */
	@ApiProperty({
		example: "123456",
	})
	@IsString({
		message: AccountValidationMessage.ERR_OTP_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AccountValidationMessage.ERR_OTP_REQUIRED,
	})
	otp: string;
}
