import { IOtpResponse } from "@contract";

export class NutritionistForgetPasswordSendOtpResponse implements IOtpResponse {
	private constructor(entity: IOtpResponse) {
		this.email = entity.email;
		this.expiryAt = entity.expiryAt;
	}

	email: string;
	expiryAt: Date;

	static fromEntity(
		entity: IOtpResponse,
	): NutritionistForgetPasswordSendOtpResponse {
		return new NutritionistForgetPasswordSendOtpResponse(entity);
	}

	static readonly exampleData: NutritionistForgetPasswordSendOtpResponse =
		new NutritionistForgetPasswordSendOtpResponse({
			email: "johndoe@example.com",
			expiryAt: new Date(),
		});
}
