import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";
import { IApiResponse } from "@contract";
import { Body, Controller, Post } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistAuthSSOGoogleRequest } from "../dto/request/nutritionist-auth-sso-google.request";
import { NutritionistAuthResponse } from "../dto/response/nutritionist-auth.response";
import { NutritionistAuthSSOService } from "../service/nutritionist-auth-sso.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "auth/sso"))
export class NutritionistAuthSSOController {
	constructor(private readonly service: NutritionistAuthSSOService) {}

	@Post("google")
	async signInWithGoogle(
		@Body() reqBody: NutritionistAuthSSOGoogleRequest,
	): Promise<IApiResponse<NutritionistAuthResponse>> {
		const result = await this.service.signInWithGoogle(reqBody);

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_AUTH_SIGN_IN,
			data: NutritionistAuthResponse.fromEntity(result),
		});
	}
}
