import { BaseApiResponse } from "@common";
import { OccupationSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistUpdateOccupationRequest } from "../dto/request/nutritionist-update-occupation.request";
import { NutritionistOccupationResponse } from "../dto/response/nutritionist-occupation.response";
import { NutritionistOccupationService } from "../service/nutritionist-occupation.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "occupation"))
export class NutritionistOccupationController {
	constructor(private readonly service: NutritionistOccupationService) {}

	/**
	 * Retrieves the occupation information associated with the currently logged-in nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of occupation information
	 *
	 */
	@Get()
	async getOccupation(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistOccupationResponse>> {
		const result = await this.service.getOccupation(nutritionist.id);

		return BaseApiResponse.success({
			message: OccupationSuccessMessage.SUCCESS_GET_OCCUPATION,
			data: NutritionistOccupationResponse.fromEntity(result),
		});
	}

	/**
	 * Updates the occupation details of the currently logged-in nutritionist.
	 *
	 * Request:
	 * - name: string
	 * - workPlace: string
	 * - experience: number
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of updated occupation information
	 *
	 */
	@Put()
	async updateOccupation(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistUpdateOccupationRequest,
	): Promise<IApiResponse<NutritionistOccupationResponse>> {
		const result = await this.service.updateOccupationDetail(
			nutritionist.id,
			reqBody,
		);

		return BaseApiResponse.success({
			message: OccupationSuccessMessage.SUCCESS_UPDATE_OCCUPATION,
			data: NutritionistOccupationResponse.fromEntity(result),
		});
	}
}
