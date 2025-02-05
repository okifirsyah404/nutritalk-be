import { PrismaSelector, PrismaService } from "@config/prisma";
import { IConsultationMetaEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistConsultationMetaRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Finds the consultation metadata for a given nutritionist by their ID.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @returns A promise that resolves to the consultation metadata entity.
	 * @throws Will throw an error if the database query fails.
	 */
	async findConsultationMetaByNutritionistId(
		nutritionistId: string,
	): Promise<IConsultationMetaEntity> {
		return this.prisma.consultationMeta
			.findUnique({
				where: {
					nutritionistId,
				},
				select: PrismaSelector.CONSULTATION_META,
			})
			.catch(createDatabaseErrorHandler);
	}
}
