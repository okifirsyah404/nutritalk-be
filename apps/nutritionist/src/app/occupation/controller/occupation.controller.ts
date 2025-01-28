import { BaseApiResponse } from "@common";
import { OccupationSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { UpdateOccupationRequest } from "../dto/request/update-occupation.request";
import { OccupationResponse } from "../dto/response/occupation.response";
import { OccupationService } from "../service/occupation.service";

@UseGuards(AccessTokenGuard)
@Controller("occupations")
export class OccupationController {
	constructor(private readonly service: OccupationService) {}

	@Get()
	async getOccupation(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<OccupationResponse>> {
		const result = await this.service.getOccupation(nutritionist.id);

		return BaseApiResponse.success({
			message: OccupationSuccessMessage.SUCCESS_GET_OCCUPATION,
			data: OccupationResponse.fromEntity(result),
		});
	}

	@Put()
	async updateOccupation(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: UpdateOccupationRequest,
	): Promise<IApiResponse<OccupationResponse>> {
		const result = await this.service.updateOccupationDetail(
			nutritionist.id,
			reqBody,
		);

		return BaseApiResponse.success({
			message: OccupationSuccessMessage.SUCCESS_UPDATE_OCCUPATION,
			data: OccupationResponse.fromEntity(result),
		});
	}
}
