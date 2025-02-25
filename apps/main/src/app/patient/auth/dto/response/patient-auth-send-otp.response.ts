import { IOtpResponse } from "@contract";

export class PatientAuthSendOtpResponse implements IOtpResponse {
	private constructor(entity: IOtpResponse) {
		this.email = entity.email;
		this.expiryAt = entity.expiryAt;
	}

	email: string;
	expiryAt: Date;

	static fromEntity(entity: IOtpResponse): PatientAuthSendOtpResponse {
		return new PatientAuthSendOtpResponse(entity);
	}

	static readonly exampleData: PatientAuthSendOtpResponse =
		new PatientAuthSendOtpResponse({
			email: "johndoe@example.com",
			expiryAt: new Date(),
		});
}
