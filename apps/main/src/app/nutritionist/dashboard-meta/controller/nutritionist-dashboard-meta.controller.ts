import { BaseApiResponse } from "@common";
import { NutritionistSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistDashboardMetaResponse } from "../dto/response/nutritionist-dashboard-meta.response";
import { NutritionistDashboardMetaService } from "../service/nutritionist-dashboard-meta.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "dashboard-meta"))
export class NutritionistDashboardMetaController {
	constructor(private readonly service: NutritionistDashboardMetaService) {}

	@Get()
	async getNutritionistDashboardMeta(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistDashboardMetaResponse>> {
		const result = await this.service.getNutritionistDashboardMeta(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_DASHBOARD_META,
			data: result,
		});
	}
}
