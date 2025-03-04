import { NutritionistErrorMessage } from "@constant/message";
import { IRegistrationCertificateEntity } from "@contract";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { NutritionistCertificateRepository } from "../repository/nutritionist-certificate.repository";

@Injectable()
export class NutritionistCertificateService {
	constructor(private readonly repository: NutritionistCertificateRepository) {}

	/**
	 * Retrieves a certificate by the given nutritionist ID.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose certificate is to be retrieved.
	 * @returns A promise that resolves to the registration certificate entity.
	 * @throws NotFoundException - If no certificate is found for the given nutritionist ID.
	 */
	async getCertificateByNutritionistId(
		nutritionistId: string,
	): Promise<IRegistrationCertificateEntity> {
		const result =
			await this.repository.findCertificateByNutritionistId(nutritionistId);

		if (!result) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_CERTIFICATE_NOT_FOUND,
			);
		}

		return result;
	}

	/**
	 * Creates a new registration certificate for a nutritionist.
	 *
	 * @param nutritionistId - The ID of the nutritionist for whom the certificate is being created.
	 * @param certificate - An object containing the registration number, issue date, and validity period of the certificate.
	 * @returns A promise that resolves to the created registration certificate entity.
	 * @throws {BadRequestException} If a certificate already exists for the given nutritionist ID.
	 */
	async createCertificate(
		nutritionistId: string,
		certificate: Pick<
			IRegistrationCertificateEntity,
			"registrationNumber" | "issueDate" | "validUntil"
		>,
	): Promise<IRegistrationCertificateEntity> {
		const existingCertificate =
			await this.repository.findCertificateByNutritionistId(nutritionistId);

		if (existingCertificate) {
			throw new BadRequestException(
				NutritionistErrorMessage.ERR_CERTIFICATE_ALREADY_EXISTS,
			);
		}

		return await this.repository.createCertificate(nutritionistId, certificate);
	}

	/**
	 * Updates the registration certificate for a given nutritionist.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @param certificate - A partial object containing the certificate details to be updated.
	 * @returns A promise that resolves to the updated registration certificate entity.
	 */
	async updateCertificate(
		nutritionistId: string,
		certificate: Partial<IRegistrationCertificateEntity>,
	): Promise<IRegistrationCertificateEntity> {
		return await this.repository.updateCertificate(nutritionistId, certificate);
	}

	/**
	 * Deletes the certificate associated with the given nutritionist ID.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose certificate is to be deleted.
	 * @returns A promise that resolves when the certificate is successfully deleted.
	 * @throws NotFoundException - If no certificate is found for the given nutritionist ID.
	 */
	async deleteCertificate(nutritionistId: string): Promise<void> {
		const existingCertificate =
			await this.repository.findCertificateByNutritionistId(nutritionistId);

		if (!existingCertificate) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_CERTIFICATE_NOT_FOUND,
			);
		}

		await this.repository.deleteCertificate(nutritionistId);
	}
}
