import { ApiProperty, PickType } from "@nestjs/swagger";
import { PatientAuthSignInRequest } from "@app/app/patient/auth/dto/request/patient-auth-sign-in.request";
import { IOtpVerifyRequest } from "@contract";
import { OtpValidationMessage } from "@constant/message";
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
		message: OtpValidationMessage.ERR_OTP_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: OtpValidationMessage.ERR_OTP_REQUIRED,
	})
	otp: string;
}
