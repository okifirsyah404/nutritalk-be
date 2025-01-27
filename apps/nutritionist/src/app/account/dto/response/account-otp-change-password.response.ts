import { IOtpResponse } from "@contract";

export class AccountOtpChangePasswordResponse implements IOtpResponse {
	private constructor(email: string, expiryAt: Date) {
		this.email = email;
		this.expiryAt = expiryAt;
	}

	email: string;
	expiryAt: Date;

	static fromEntity(entity: IOtpResponse): AccountOtpChangePasswordResponse {
		return new AccountOtpChangePasswordResponse(entity.email, entity.expiryAt);
	}

	static readonly exampleData: AccountOtpChangePasswordResponse =
		new AccountOtpChangePasswordResponse("johndoe@example.com", new Date());
}
