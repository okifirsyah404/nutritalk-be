import { IOtpEmail } from "@contract";

export class AccountOtpChangePasswordResponse implements IOtpEmail {
	private constructor(email: string) {
		this.email = email;
	}

	email: string;

	static fromEntity(entity: IOtpEmail): AccountOtpChangePasswordResponse {
		return new AccountOtpChangePasswordResponse(entity.email);
	}

	static readonly exampleData: AccountOtpChangePasswordResponse =
		new AccountOtpChangePasswordResponse("johndoe@example.com");
}
