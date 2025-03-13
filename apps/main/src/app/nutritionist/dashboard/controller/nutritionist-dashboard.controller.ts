import { BaseApiResponse } from "@common";
import { NutritionistSuccessMessage } from "@constant/message";
import { INutritionistDashboardResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistDashboardService } from "../service/nutritionist-dashboard.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "dashboard"))
export class NutritionistDashboardController {
	constructor(private readonly service: NutritionistDashboardService) {}

	@Get()
	async getNutritionistDashboard(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<BaseApiResponse<INutritionistDashboardResponse>> {
		const result = await this.service.getNutritionistDashboard(nutritionist.id);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_DASHBOARD,
			data: result,
		});
	}
}
