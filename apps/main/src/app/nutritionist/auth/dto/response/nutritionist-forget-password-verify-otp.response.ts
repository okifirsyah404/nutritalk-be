import { IOtpVerifyResponse } from "@contract";

export class NutritionistForgetPasswordVerifyOtpResponse
	implements IOtpVerifyResponse
{
	private constructor({ signature, email }: IOtpVerifyResponse) {
		this.signature = signature;
		this.email = email;
	}

	signature: string;
	email: string;

	static fromEntity(
		entity: IOtpVerifyResponse,
	): NutritionistForgetPasswordVerifyOtpResponse {
		return new NutritionistForgetPasswordVerifyOtpResponse(entity);
	}

	static readonly exampleData: NutritionistForgetPasswordVerifyOtpResponse =
		new NutritionistForgetPasswordVerifyOtpResponse({
			signature:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
			email: "johndoe@example.com",
		});
}
