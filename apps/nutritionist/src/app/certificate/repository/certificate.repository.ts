import { PrismaSelector, PrismaService } from "@config/prisma";
import { IRegistrationCertificateEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CertificateRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createCertificate(
		nutritionistId: string,
		{
			registrationNumber,
			issueDate,
			validUntil,
		}: IRegistrationCertificateEntity,
	): Promise<IRegistrationCertificateEntity> {
		return await this.prisma.registrationCertificate
			.create({
				data: {
					registrationNumber,
					issueDate,
					validUntil,
					nutritionist: {
						connect: {
							id: nutritionistId,
						},
					},
				},
				select: PrismaSelector.REGISTRATION_CERTIFICATE,
			})
			.catch(createDatabaseErrorHandler);
	}

	async getCertificateByNutritionistId(
		nutritionistId: string,
	): Promise<IRegistrationCertificateEntity> {
		return await this.prisma.registrationCertificate
			.findFirst({
				where: {
					nutritionistId,
				},
				select: PrismaSelector.REGISTRATION_CERTIFICATE,
			})
			.catch(createDatabaseErrorHandler);
	}

	async updateCertificate(
		nutritionistId: string,
		{
			registrationNumber,
			issueDate,
			validUntil,
		}: Partial<IRegistrationCertificateEntity>,
	): Promise<IRegistrationCertificateEntity> {
		return await this.prisma.registrationCertificate
			.update({
				where: {
					nutritionistId,
				},
				data: {
					registrationNumber,
					issueDate,
					validUntil,
				},
				select: PrismaSelector.REGISTRATION_CERTIFICATE,
			})
			.catch(createDatabaseErrorHandler);
	}

	async deleteCertificate(nutritionistId: string): Promise<void> {
		await this.prisma.registrationCertificate
			.delete({
				where: {
					nutritionistId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
