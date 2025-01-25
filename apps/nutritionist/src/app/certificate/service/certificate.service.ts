import { IRegistrationCertificateEntity } from "@contract";
import { Injectable } from "@nestjs/common";
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
			throw new Error("Certificate not found");
		}

		return result;
	}

	async createCertificate(
		nutritionistId: string,
		certificate: IRegistrationCertificateEntity,
	): Promise<IRegistrationCertificateEntity> {
		return await this.repository.createCertificate(nutritionistId, certificate);
	}

	async updateCertificate(
		nutritionistId: string,
		certificate: Partial<IRegistrationCertificateEntity>,
	): Promise<IRegistrationCertificateEntity> {
		return await this.repository.updateCertificate(nutritionistId, certificate);
	}

	async deleteCertificate(nutritionistId: string): Promise<void> {
		await this.repository.deleteCertificate(nutritionistId);
	}
}
