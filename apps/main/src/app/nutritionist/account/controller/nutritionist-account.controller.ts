import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistAccountResponse } from "../dto/response/nutritionist-account.response";
import { NutritionistAccountService } from "../service/nutritionist-account.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "account"))
export class NutritionistAccountController {
	constructor(private readonly service: NutritionistAccountService) {}

	@Get()
	async getAccount(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistAccountResponse>> {
		const result = await this.service.getAccountByNutritionistId(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_GET_ACCOUNT,
			data: NutritionistAccountResponse.fromEntity(result),
		});
	}
}
