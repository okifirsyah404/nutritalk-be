import { IOtpEmail } from "@contract";

export class AuthForgetPasswordResponse implements IOtpEmail {
	private constructor(email: string) {
		this.email = email;
	}

	email: string;

	static fromEntity(entity: IOtpEmail): AuthForgetPasswordResponse {
		return new AuthForgetPasswordResponse(entity.email);
	}

	static readonly exampleData: AuthForgetPasswordResponse =
		new AuthForgetPasswordResponse("johndoe@example.com");
}
