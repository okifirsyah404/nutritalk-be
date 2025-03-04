import { BaseApiResponse } from "@common";
import { NutritionistSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistCreateCertificateRequest } from "../dto/request/nutritionist-create-certificate.request";
import { NutritionistUpdateCertificateRequest } from "../dto/request/nutritionist-update-certificate.request";
import { NutritionistCertificateResponse } from "../dto/response/nutritionist-certificate.response";
import { NutritionistCertificateService } from "../service/nutritionist-certificate.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "certificate"))
export class NutritionistCertificateController {
	constructor(private readonly service: NutritionistCertificateService) {}

	/**
	 * Retrieves the certificate information associated with the currently logged-in nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of certificate information
	 *
	 */
	@Get()
	async getCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistCertificateResponse>> {
		const result = await this.service.getCertificateByNutritionistId(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_REGISTRATION_CERTIFICATE,
			data: NutritionistCertificateResponse.fromEntity(result),
		});
	}

	/**
	 * Creates a new registration certificate for a nutritionist.
	 *
	 * Request body:
	 * - registrationNumber: (required) string
	 * - issueDate: (required) string
	 * - validUntil: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of created registration certificate
	 *
	 */
	@Post()
	async createCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistCreateCertificateRequest,
	): Promise<IApiResponse<NutritionistCertificateResponse>> {
		const result = await this.service.createCertificate(nutritionist.id, {
			registrationNumber: reqBody.registrationNumber,
			issueDate: reqBody.issueDate,
			validUntil: reqBody.validUntil,
		});

		return BaseApiResponse.success({
			message:
				NutritionistSuccessMessage.SUCCESS_CREATE_REGISTRATION_CERTIFICATE,
			data: NutritionistCertificateResponse.fromEntity(result),
		});
	}

	/**
	 * Updates the certificate information associated with the currently logged-in nutritionist.
	 *
	 * Request body:
	 * - registrationNumber: (required) string
	 * - issueDate: (required) string
	 * - validUntil: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of updated registration certificate
	 *
	 */
	@Put()
	async updateCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistUpdateCertificateRequest,
	): Promise<IApiResponse<NutritionistCertificateResponse>> {
		const result = await this.service.updateCertificate(nutritionist.id, {
			registrationNumber: reqBody.registrationNumber,
			issueDate: reqBody.issueDate,
			validUntil: reqBody.validUntil,
		});

		return BaseApiResponse.success({
			message:
				NutritionistSuccessMessage.SUCCESS_UPDATE_REGISTRATION_CERTIFICATE,
			data: NutritionistCertificateResponse.fromEntity(result),
		});
	}

	/**
	 * Deletes the certificate associated with the currently logged-in nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: undefined
	 *
	 */
	@Delete()
	async deleteCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<void>> {
		await this.service.deleteCertificate(nutritionist.id);

		return BaseApiResponse.success({
			message:
				NutritionistSuccessMessage.SUCCESS_DELETE_REGISTRATION_CERTIFICATE,
			data: undefined,
		});
	}
}
