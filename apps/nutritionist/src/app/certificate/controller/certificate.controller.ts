import { BaseApiResponse } from "@common";
import { RegistrationCertificateSuccessMessage } from "@constant/message";
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
import { CreateCertificateRequest } from "../dto/request/create-certificate.request";
import { UpdateCertificateRequest } from "../dto/request/update-certificate.request";
import { CertificateResponse } from "../dto/response/certificate.response";
import { CertificateService } from "../service/certificate.service";

@UseGuards(AccessTokenGuard)
@Controller("certificate")
export class CertificateController {
	constructor(private readonly certificateService: CertificateService) {}

	@Get()
	async getCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<CertificateResponse>> {
		const result = await this.certificateService.getCertificateByNutritionistId(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message:
				RegistrationCertificateSuccessMessage.SUCCESS_GET_REGISTRATION_CERTIFICATE,
			data: CertificateResponse.fromEntity(result),
		});
	}

	@Post()
	async createCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: CreateCertificateRequest,
	): Promise<IApiResponse<CertificateResponse>> {
		const result = await this.certificateService.createCertificate(
			nutritionist.id,
			{
				registrationNumber: reqBody.registrationNumber,
				issueDate: reqBody.issueDate,
				validUntil: reqBody.validUntil,
			},
		);

		return BaseApiResponse.success({
			message:
				RegistrationCertificateSuccessMessage.SUCCESS_CREATE_REGISTRATION_CERTIFICATE,
			data: CertificateResponse.fromEntity(result),
		});
	}

	@Put()
	async updateCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: UpdateCertificateRequest,
	): Promise<IApiResponse<CertificateResponse>> {
		const result = await this.certificateService.updateCertificate(
			nutritionist.id,
			{
				registrationNumber: reqBody.registrationNumber,
				issueDate: reqBody.issueDate,
				validUntil: reqBody.validUntil,
			},
		);

		return BaseApiResponse.success({
			message:
				RegistrationCertificateSuccessMessage.SUCCESS_UPDATE_REGISTRATION_CERTIFICATE,
			data: CertificateResponse.fromEntity(result),
		});
	}

	@Delete()
	async deleteCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<void>> {
		await this.certificateService.deleteCertificate(nutritionist.id);

		return BaseApiResponse.success({
			message:
				RegistrationCertificateSuccessMessage.SUCCESS_DELETE_REGISTRATION_CERTIFICATE,
			data: undefined,
		});
	}
}
