import { IOtpVerifyResponse } from "@contract";

export class AccountOtpVerifyChangePasswordResponse
	implements IOtpVerifyResponse
{
	private constructor(email: string, signature: string) {
		this.email = email;
		this.signature = signature;
	}

	email: string;
	signature: string;

	static fromEntity(
		entity: IOtpVerifyResponse,
	): AccountOtpVerifyChangePasswordResponse {
		return new AccountOtpVerifyChangePasswordResponse(
			entity.email,
			entity.signature,
		);
	}
}
