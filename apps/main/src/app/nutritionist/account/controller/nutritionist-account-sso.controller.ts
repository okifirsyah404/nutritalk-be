import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";
import { INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistBindGoogleSSORequest } from "../dto/request/nutritionist-bind-google-sso.request";
import { NutritionistAccountResponse } from "../dto/response/nutritionist-account.response";
import { NutritionistAccountSSOService } from "../service/nutritionist-account-sso.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "account/sso"))
export class NutritionistAccountSSOController {
	constructor(private readonly service: NutritionistAccountSSOService) {}

	@Put("google")
	async bindGoogleSSO(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() data: NutritionistBindGoogleSSORequest,
	): Promise<BaseApiResponse<NutritionistAccountResponse>> {
		const result = await this.service.bindGoogleSSO(nutritionist.account, data);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_BIND_GOOGLE_SSO,
			data: NutritionistAccountResponse.fromEntity(result),
		});
	}
}
