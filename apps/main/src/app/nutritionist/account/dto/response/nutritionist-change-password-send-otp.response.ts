import { IOtpResponse } from "@contract";

export class NutritionistChangePasswordSendOtpResponse implements IOtpResponse {
	private constructor(email: string, expiryAt: Date) {
		this.email = email;
		this.expiryAt = expiryAt;
	}

	email: string;
	expiryAt: Date;

	static fromEntity(
		entity: IOtpResponse,
	): NutritionistChangePasswordSendOtpResponse {
		return new NutritionistChangePasswordSendOtpResponse(
			entity.email,
			entity.expiryAt,
		);
	}

	static readonly exampleData: NutritionistChangePasswordSendOtpResponse =
		new NutritionistChangePasswordSendOtpResponse(
			"johndoe@example.com",
			new Date(),
		);
}
