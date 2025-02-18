import { IOtpEmail } from "@contract";
import { PickType } from "@nestjs/swagger";
import { NutritionistAuthSignInRequest } from "./nutritionist-auth-sign-in.request";

export class NutritionistForgetPasswordSendOtpRequest
	extends PickType(NutritionistAuthSignInRequest, ["email"])
	implements IOtpEmail {}
