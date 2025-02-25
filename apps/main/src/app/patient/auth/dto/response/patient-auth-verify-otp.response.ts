import { IOtpVerifyResponse } from "@contract";

export class PatientAuthVerifyOtpResponse implements IOtpVerifyResponse {
	private constructor({ signature, email }: IOtpVerifyResponse) {
		this.signature = signature;
		this.email = email;
	}

	signature: string;
	email: string;

	static fromEntity(entity: IOtpVerifyResponse): PatientAuthVerifyOtpResponse {
		return new PatientAuthVerifyOtpResponse(entity);
	}

	static readonly exampleData: PatientAuthVerifyOtpResponse =
		new PatientAuthVerifyOtpResponse({
			signature:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
			email: "johndoe@example.com",
		});
}
