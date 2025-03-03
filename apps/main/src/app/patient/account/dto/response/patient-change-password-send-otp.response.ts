import { IOtpResponse } from "@contract";

export class PatientChangePasswordSendOtpResponse implements IOtpResponse {
	private constructor(entity: IOtpResponse) {
		this.email = entity.email;
		this.expiryAt = entity.expiryAt;
	}

	email: string;
	expiryAt: Date;

	public static fromEntity(
		entity: IOtpResponse,
	): PatientChangePasswordSendOtpResponse {
		return new PatientChangePasswordSendOtpResponse(entity);
	}
}
