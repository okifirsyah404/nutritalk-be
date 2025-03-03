import { IOtpVerifyRequest } from "@contract";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
	EmailValidationMessage,
	OtpValidationMessage,
} from "@constant/message";

export class PatientChangePasswordVerifyOtpRequest
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
		message: OtpValidationMessage.ERR_OTP_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: OtpValidationMessage.ERR_OTP_REQUIRED,
	})
	otp: string;
}
