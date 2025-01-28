import { RegistrationCertificateErrorMessage } from "@constant/message";
import { IRegistrationCertificateEntity } from "@contract";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { CertificateRepository } from "../repository/certificate.repository";

@Injectable()
export class CertificateService {
	constructor(private readonly repository: CertificateRepository) {}

	async getCertificateByNutritionistId(
		nutritionistId: string,
	): Promise<IRegistrationCertificateEntity> {
		const result =
			await this.repository.getCertificateByNutritionistId(nutritionistId);

		if (!result) {
			throw new NotFoundException(
				RegistrationCertificateErrorMessage.ERR_CERTIFICATE_NOT_FOUND,
			);
		}

		return result;
	}

	async createCertificate(
		nutritionistId: string,
		certificate: Pick<
			IRegistrationCertificateEntity,
			"registrationNumber" | "issueDate" | "validUntil"
		>,
	): Promise<IRegistrationCertificateEntity> {
		const existingCertificate =
			await this.repository.getCertificateByNutritionistId(nutritionistId);

		if (existingCertificate) {
			throw new BadRequestException(
				RegistrationCertificateErrorMessage.ERR_CERTIFICATE_ALREADY_EXISTS,
			);
		}

		return await this.repository.insertCertificate(nutritionistId, certificate);
	}

	async updateCertificate(
		nutritionistId: string,
		certificate: Partial<IRegistrationCertificateEntity>,
	): Promise<IRegistrationCertificateEntity> {
		return await this.repository.updateCertificate(nutritionistId, certificate);
	}

	async deleteCertificate(nutritionistId: string): Promise<void> {
		const existingCertificate =
			await this.repository.getCertificateByNutritionistId(nutritionistId);

		if (!existingCertificate) {
			throw new NotFoundException(
				RegistrationCertificateErrorMessage.ERR_CERTIFICATE_NOT_FOUND,
			);
		}

		await this.repository.deleteCertificate(nutritionistId);
	}
}
