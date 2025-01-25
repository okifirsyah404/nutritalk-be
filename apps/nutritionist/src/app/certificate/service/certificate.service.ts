import { RegistrationCertificateErrorMessage } from "@constant/message";
import { IRegistrationCertificateEntity } from "@contract";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { DateRange } from "@util";
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
		certificateNumber: string,
		certificateDates: DateRange,
	): Promise<IRegistrationCertificateEntity> {
		const existingCertificate =
			await this.repository.getCertificateByNutritionistId(nutritionistId);

		if (existingCertificate) {
			throw new BadRequestException(
				RegistrationCertificateErrorMessage.ERR_CERTIFICATE_ALREADY_EXISTS,
			);
		}

		return await this.repository.insertCertificate(nutritionistId, {
			registrationNumber: certificateNumber,
			issueDate: certificateDates.start.toDate(),
			validUntil: certificateDates.end.toDate(),
		});
	}

	async updateCertificate(
		nutritionistId: string,
		certificateNumber: string,
		certificateDates: DateRange,
	): Promise<IRegistrationCertificateEntity> {
		return await this.repository.updateCertificate(nutritionistId, {
			registrationNumber: certificateNumber,
			issueDate: certificateDates.start.toDate(),
			validUntil: certificateDates.end.toDate(),
		});
	}

	async deleteCertificate(nutritionistId: string): Promise<void> {
		await this.repository.deleteCertificate(nutritionistId);
	}
}
