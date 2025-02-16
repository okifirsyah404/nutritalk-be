import { IGoogleSSORequest } from "@contract";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class NutritionistAuthSSOGoolgleRequest implements IGoogleSSORequest {
	@IsJWT()
	@IsString()
	@IsNotEmpty()
	googleJwtToken: string;
}
