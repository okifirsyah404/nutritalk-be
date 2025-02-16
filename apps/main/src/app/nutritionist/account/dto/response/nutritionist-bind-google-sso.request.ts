import { IBindGoogleSSORequest } from "@contract/request/account/bind-google-sso-request.interface";
import {
	IsBoolean,
	IsJWT,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class NutritionistBindGoogleSSORequest implements IBindGoogleSSORequest {
	@IsJWT()
	@IsString()
	@IsNotEmpty()
	googleJwtToken: string;

	@IsBoolean()
	@IsOptional()
	alsoChangeEmail?: boolean;
}
