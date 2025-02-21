import { Controller, Get, UseGuards } from "@nestjs/common";
import { NutritionistDashboardMetaService } from "../service/nutritionist-dashboard-meta.service";
import { UriUtil } from "@util";
import { AccountRole } from "@prisma/client";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { IApiResponse, INutritionistEntity } from "@contract";
import { NutritionistDashboardMetaResponse } from "../dto/response/nutritionist-dashboard-meta.response";
import { BaseApiResponse } from "@common";
import { DashboardSuccessMessage } from "@constant/message";

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
			message: DashboardSuccessMessage.SUCCESS_GET_DASHBOARD_META,
			data: result,
		});
	}
}
