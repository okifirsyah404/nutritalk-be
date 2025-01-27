import { OtpValidationMessage } from "@constant/message";
import { IOtpVerifyRequest } from "@contract";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { AuthSignInRequest } from "./auth-sign-in.request";

export class AuthOtpVerifyRequest
	extends PickType(AuthSignInRequest, ["email"])
	implements IOtpVerifyRequest
{
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
