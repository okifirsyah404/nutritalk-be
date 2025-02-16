import { PrismaService } from "@config/prisma";
import { INutritionistEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistCredentialRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getNutritionist(nutritionistId: string): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
			.findUnique({
				where: {
					id: nutritionistId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async updateCredential(
		nutritionistId: string,
		data: Partial<Pick<INutritionistEntity, "nip" | "nidn">>,
	): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
			.update({
				data: {
					nip: data.nip,
					nidn: data.nidn,
				},
				where: {
					id: nutritionistId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
