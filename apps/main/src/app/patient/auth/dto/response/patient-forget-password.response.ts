import { IOtpEmail } from "@contract";

export class PatientForgetPasswordResponse implements IOtpEmail {
	private constructor(email: string) {
		this.email = email;
	}

	email: string;

	static fromEntity(entity: IOtpEmail): PatientForgetPasswordResponse {
		return new PatientForgetPasswordResponse(entity.email);
	}

	static readonly exampleData: PatientForgetPasswordResponse =
		new PatientForgetPasswordResponse("johndoe@example.com");
}
