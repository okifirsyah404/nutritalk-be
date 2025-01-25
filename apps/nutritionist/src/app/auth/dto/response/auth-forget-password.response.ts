import { IOtpRequest } from "@contract";

export class AuthForgetPasswordResponse implements IOtpRequest {
	private constructor(email: string) {
		this.email = email;
	}

	email: string;

	static fromEntity(entity: IOtpRequest): AuthForgetPasswordResponse {
		return new AuthForgetPasswordResponse(entity.email);
	}

	static readonly exampleData: AuthForgetPasswordResponse =
		new AuthForgetPasswordResponse("johndoe@example.com");
}
