import { IOtpVerifyResponse } from "@contract";

export class NutritionistChangePasswordVerifyOtpResponse
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
	): NutritionistChangePasswordVerifyOtpResponse {
		return new NutritionistChangePasswordVerifyOtpResponse(
			entity.email,
			entity.signature,
		);
	}
}
