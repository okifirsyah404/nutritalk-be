import { IOtpVerifyResponse } from "@contract";

export class PatientChangePasswordVerifyOtpResponse
	implements IOtpVerifyResponse
{
	private constructor(entity: IOtpVerifyResponse) {
		this.email = entity.email;
		this.signature = entity.signature;
	}

	email: string;
	signature: string;

	public static fromEntity(
		entity: IOtpVerifyResponse,
	): PatientChangePasswordVerifyOtpResponse {
		return new PatientChangePasswordVerifyOtpResponse(entity);
	}
}
