import { IOtpEmail } from "@contract";

export class NutritionistForgetPasswordSendOtpResponse implements IOtpEmail {
	private constructor(email: string) {
		this.email = email;
	}

	email: string;

	static fromEntity(
		entity: IOtpEmail,
	): NutritionistForgetPasswordSendOtpResponse {
		return new NutritionistForgetPasswordSendOtpResponse(entity.email);
	}

	static readonly exampleData: NutritionistForgetPasswordSendOtpResponse =
		new NutritionistForgetPasswordSendOtpResponse("johndoe@example.com");
}
