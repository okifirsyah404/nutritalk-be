import { PickType } from "@nestjs/swagger";
import { NutritionistAuthSignInRequest } from "./nutritionist-auth-sign-in.request";

export class NutritionistAuthRefreshTokenRequest extends PickType(
	NutritionistAuthSignInRequest,
	["fcmToken"] as const,
) {}
