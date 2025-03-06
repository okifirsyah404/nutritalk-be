import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { PatientNutritionistService } from "../service/patient-nutritionist.service";
import { UriUtil } from "@util";
import { AccountRole } from "@prisma/client";
import { AccessTokenGuard } from "@module/app-jwt";
import { PatientNutritionistIndexQuery } from "@app/app/patient/nutritionist/dto/query/patient-nutritionist-index.query";
import { PatientNutritionistResponse } from "@app/app/patient/nutritionist/dto/response/patient-nutritionist.response";
import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { IApiPaginationResponse, IApiResponse } from "@contract";
import { NutritionistSuccessMessage } from "@constant/message";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "nutritionist"))
export class PatientNutritionistController {
	constructor(private readonly service: PatientNutritionistService) {}

	/**
	 * Retrieves the list of nutritionists based on the provided query parameters.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - pagination: object of pagination details
	 * - data: list of objects of nutritionist information
	 *
	 */
	@Get()
	async paginateNutritionists(
		@Query() query: PatientNutritionistIndexQuery,
	): Promise<IApiPaginationResponse<PatientNutritionistResponse>> {
		const result = await this.service.paginateNutritionists(query);

		return BaseApiPaginationResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_NUTRITIONIST,
			pagination: result.pagination,
			data: PatientNutritionistResponse.fromEntities(result.items),
		});
	}

	/**
	 * Retrieves the nutritionist information based on the provided ID.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of nutritionist information
	 *
	 */
	@Get(":nutritionistId")
	async getNutritionist(
		@Param("nutritionistId") id: string,
		@Query() query: PatientNutritionistIndexQuery,
	): Promise<IApiResponse<PatientNutritionistResponse>> {
		const result = await this.service.getNutritionist(id, query);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_NUTRITIONIST,
			data: PatientNutritionistResponse.fromEntity(result),
		});
	}
}
