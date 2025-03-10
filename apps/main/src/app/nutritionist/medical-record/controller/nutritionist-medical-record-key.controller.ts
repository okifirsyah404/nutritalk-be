import { NutritionistBindMedicalRecordPatientRequest } from "@app/app/nutritionist/medical-record/dto/request/nutritionist-bind-medical-record-patient.request";
import { NutritionistCreateMedicalRecordKeyRequest } from "@app/app/nutritionist/medical-record/dto/request/nutritionist-create-medical-record-key.request";
import { NutritionistMedicalRecordKeyResponse } from "@app/app/nutritionist/medical-record/dto/response/nutritionist-medical-record-key.response";
import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { MedicalRecordSuccessMessage } from "@constant/message";
import { AccessTokenGuard } from "@module/app-jwt";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistMedicalRecordIndexQuery } from "../dto/query/nutritionist-medical-record-index.query";
import { NutritionistMedicalRecordKeyService } from "../service/nutritionist-medical-record-key.service";

@UseGuards(AccessTokenGuard)
@Controller(
	UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "medical-record-key"),
)
export class NutritionistMedicalRecordKeyController {
	constructor(private readonly service: NutritionistMedicalRecordKeyService) {}

	/*
	 * Paginate medical record key
	 *
	 * Request Query: IndexPaginationRequest
	 *
	 * Response: BaseApiPaginationResponse<NutritionistMedicalRecordKeyResponse>
	 */
	@Get()
	async paginate(
		@Query() query: NutritionistMedicalRecordIndexQuery,
	): Promise<BaseApiPaginationResponse<NutritionistMedicalRecordKeyResponse>> {
		const result = await this.service.paginate(query);

		return BaseApiPaginationResponse.success({
			pagination: result.pagination,
			message: MedicalRecordSuccessMessage.SUCCESS_GET_MEDICAL_RECORD_KEY,
			data: NutritionistMedicalRecordKeyResponse.fromEntities(result.items),
		});
	}

	/*
	 * Get medical record key
	 *
	 * Request Param: medicalRecordKeyId
	 *
	 * Response: BaseApiResponse<NutritionistMedicalRecordKeyResponse>
	 */
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

	/*
	 * Create medical record key
	 *
	 * Request Body: NutritionistCreateMedicalRecordKeyRequest
	 *
	 * Response: BaseApiResponse<NutritionistMedicalRecordKeyResponse>
	 */
	@Post()
	async createMedicalRecordKey(
		@Body() reqBody: NutritionistCreateMedicalRecordKeyRequest,
	): Promise<BaseApiResponse<NutritionistMedicalRecordKeyResponse>> {
		const result = await this.service.createMedicalRecordKey(reqBody);

		return BaseApiResponse.created({
			message: MedicalRecordSuccessMessage.SUCCESS_CREATE_MEDICAL_RECORD_KEY,
			data: NutritionistMedicalRecordKeyResponse.fromEntity(result),
		});
	}

	/*
	 * Bind patient to medical record key
	 *
	 * Request Param: medicalRecordKeyId
	 * Request Body: NutritionistBindMedicalRecordPatientRequest
	 *
	 * Response: BaseApiResponse<NutritionistMedicalRecordKeyResponse>
	 */
	@Post("bind-patient/:medicalRecordKeyId")
	async bindPatient(
		@Param("medicalRecordKeyId") id: string,
		@Body() reqBody: NutritionistBindMedicalRecordPatientRequest,
	): Promise<BaseApiResponse<NutritionistMedicalRecordKeyResponse>> {
		const result = await this.service.bindMedicalRecordKeyToPatient(
			id,
			reqBody,
		);

		return BaseApiResponse.created({
			message: MedicalRecordSuccessMessage.SUCCESS_BIND_PATIENT,
			data: NutritionistMedicalRecordKeyResponse.fromEntity(result),
		});
	}

	/*
	 * Unbind patient from medical record key
	 *
	 * Request Param: medicalRecordKeyId
	 *
	 * Response: BaseApiResponse<NutritionistMedicalRecordKeyResponse>
	 */
	@Delete("bind-patient/:medicalRecordKeyId")
	async unbindPatient(
		@Param("medicalRecordKeyId") id: string,
	): Promise<BaseApiResponse<NutritionistMedicalRecordKeyResponse>> {
		const result = await this.service.unbindMedicalRecordKeyToPatient(id);

		return BaseApiResponse.success({
			message: MedicalRecordSuccessMessage.SUCCESS_UNBIND_PATIENT,
			data: NutritionistMedicalRecordKeyResponse.fromEntity(result),
		});
	}
}
