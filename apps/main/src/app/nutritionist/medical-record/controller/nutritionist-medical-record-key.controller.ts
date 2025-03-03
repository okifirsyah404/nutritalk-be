import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { NutritionistMedicalRecordKeyService } from "../service/nutritionist-medical-record-key.service";
import { AccessTokenGuard } from "@module/app-jwt";
import {
	BaseApiPaginationResponse,
	BaseApiResponse,
	IndexPaginationRequest,
} from "@common";
import { UriUtil } from "@util";
import { AccountRole } from "@prisma/client";
import { NutritionistMedicalRecordKeyResponse } from "@app/app/nutritionist/medical-record/dto/response/nutritionist-medical-record-key.response";
import { MedicalRecordSuccessMessage } from "@constant/message";

@UseGuards(AccessTokenGuard)
@Controller(
	UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "medical-record-key"),
)
export class NutritionistMedicalRecordKeyController {
	constructor(private readonly service: NutritionistMedicalRecordKeyService) {}

	@Get()
	async paginate(
		@Query() query: IndexPaginationRequest,
	): Promise<BaseApiPaginationResponse<NutritionistMedicalRecordKeyResponse>> {
		const result = await this.service.paginate(query);

		return BaseApiPaginationResponse.success({
			pagination: result.pagination,
			message: MedicalRecordSuccessMessage.SUCCESS_GET_MEDICAL_RECORD_KEY,
			data: NutritionistMedicalRecordKeyResponse.fromEntities(result.items),
		});
	}

	@Get(":medicalRecordKeyId")
	async getMedicalRecordKey(
		@Param("medicalRecordKeyId") id: string,
	): Promise<BaseApiResponse<NutritionistMedicalRecordKeyResponse>> {
		const result = await this.service.getMedicalRecordKey(id);

		return BaseApiResponse.success({
			message: MedicalRecordSuccessMessage.SUCCESS_GET_MEDICAL_RECORD_KEY,
			data: NutritionistMedicalRecordKeyResponse.fromEntity(result),
		});
	}
}
