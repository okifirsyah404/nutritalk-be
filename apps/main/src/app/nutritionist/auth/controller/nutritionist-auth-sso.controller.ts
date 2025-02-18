import { BaseApiResponse } from "@common";
import { AuthSuccessMessage } from "@constant/message";
import { IApiResponse } from "@contract";
import { Body, Controller, Post } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistAuthSSOGoolgleRequest } from "../dto/request/nutritionist-auth-sso-google.request";
import { NutritionistAuthResponse } from "../dto/response/nutritionist-auth.response";
import { NutritionistAuthSSOService } from "../service/nutritionist-auth-sso.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "auth/sso"))
export class NutritionistAuthSSOController {
	constructor(private readonly service: NutritionistAuthSSOService) {}

	@Post("google")
	async signInWithGoogle(
		@Body() reqBody: NutritionistAuthSSOGoolgleRequest,
	): Promise<IApiResponse<NutritionistAuthResponse>> {
		const result = await this.service.signInWithGoogle(reqBody);

		return BaseApiResponse.created({
			message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_IN,
			data: NutritionistAuthResponse.fromEntity(result),
		});
	}
}
