import { BaseApiResponse } from "@common";
import { ConsultationMetaSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistConsultationMetaResponse } from "../dto/response/nutritionist-consultation-meta.response";
import { NutritionistConsultationMetaService } from "../service/nutritionist-consultation-meta.service";

@UseGuards(AccessTokenGuard)
@Controller(
	UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "consultation-meta"),
)
export class NutritionistConsultationMetaController {
	constructor(private readonly service: NutritionistConsultationMetaService) {}

	@Get()
	async getConsultationMeta(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistConsultationMetaResponse>> {
		const result = await this.service.getConsultationMetaByNutritionistId(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message: ConsultationMetaSuccessMessage.SUCCESS_GET_CONSULTATION_META,
			data: NutritionistConsultationMetaResponse.fromEntity(result),
		});
	}
}
