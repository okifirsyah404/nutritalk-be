import { PatientAuthSignInRequest } from "@app/app/patient/auth/dto/request/patient-auth-sign-in.request";
import { AccountValidationMessage } from "@constant/message";
import { IOtpVerifyRequest } from "@contract";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PatientAuthVerifyOtpRequest
	extends PickType(PatientAuthSignInRequest, ["email"])
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
		message: AccountValidationMessage.ERR_OTP_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AccountValidationMessage.ERR_OTP_REQUIRED,
	})
	otp: string;
}
