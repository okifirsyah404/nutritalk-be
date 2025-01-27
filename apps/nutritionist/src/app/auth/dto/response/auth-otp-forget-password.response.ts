import { IOtpVerifyResponse } from "@contract";

export class AuthOtpVerifyForgetPasswordResponse implements IOtpVerifyResponse {
	private constructor({ signature, email }: IOtpVerifyResponse) {
		this.signature = signature;
		this.email = email;
	}

	signature: string;
	email: string;

	static fromEntity(
		entity: IOtpVerifyResponse,
	): AuthOtpVerifyForgetPasswordResponse {
		return new AuthOtpVerifyForgetPasswordResponse(entity);
	}

	static readonly exampleData: AuthOtpVerifyForgetPasswordResponse =
		new AuthOtpVerifyForgetPasswordResponse({
			signature:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
			email: "johndoe@example.com",
		});
}
