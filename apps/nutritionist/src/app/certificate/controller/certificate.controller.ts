import { BaseApiResponse } from "@common";
import { RegistrationCertificateSuccessMessage } from "@constant/message";
import { INutritionistEntity, IRegistrationCertificateEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { CertificateService } from "../service/certificate.service";

@UseGuards(AccessTokenGuard)
@Controller("certificate")
export class CertificateController {
	constructor(private readonly certificateService: CertificateService) {}

	@Get()
	async getCertificate(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<BaseApiResponse<IRegistrationCertificateEntity>> {
		const result = await this.certificateService.getCertificateByNutritionistId(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			data: result,
			message:
				RegistrationCertificateSuccessMessage.SUCCESS_GET_REGISTRATION_CERTIFICATE,
		});
	}
}
