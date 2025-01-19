import { BaseApiResponse } from "@common/response/base-api.response";
import { IApiResponse } from "@contract/response/api-response.interface";
import { INutritionistEntity } from "@database/prisma";
import { AccessTokenGuard } from "@jwt/app-jwt";
import GetNutritionistLogged from "@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator";
import { Controller, Get, UseGuards } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { DocsTag } from "@nutritionist/common/docs/docs";
import { DashboardContentDocs } from "../docs/dashboard.content";
import { DashboardResponse } from "../dto/response/dashboard.response";
import { DashboardService } from "../service/dashboard.service";
import { DashboardSuccessMessage } from "@constant/constant";

@ApiTags(DocsTag.DASHBOARD)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
	content: DashboardContentDocs.UNAUTHORIZED,
})
@UseGuards(AccessTokenGuard)
@Controller("dashboard")
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	/**
	 *
	 * Http endpoint for getting the dashboard data of a nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of dashboard data
	 *
	 */
	@ApiOkResponse({
		content: DashboardContentDocs.SUCCESS_GET_DASHBOARD,
	})
	@Get()
	async getDashboardData(
		@GetNutritionistLogged() user: INutritionistEntity,
	): Promise<IApiResponse<DashboardResponse>> {
		const result = await this.dashboardService.getDashboardData(user.id);

		return BaseApiResponse.success({
			message: DashboardSuccessMessage.SUCCESS_GET_DASHBOARD,
			data: DashboardResponse.fromData(result),
		});
	}
}
