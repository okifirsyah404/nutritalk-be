import { IOtpEmail } from "@contract";

export class NutritionistForgetPasswordResponse implements IOtpEmail {
	private constructor(email: string) {
		this.email = email;
	}

	email: string;

	static fromEntity(entity: IOtpEmail): NutritionistForgetPasswordResponse {
		return new NutritionistForgetPasswordResponse(entity.email);
	}

	static readonly exampleData: NutritionistForgetPasswordResponse =
		new NutritionistForgetPasswordResponse("johndoe@example.com");
}
