import { BaseApiResponse } from "@common";
import { DashboardSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
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
