import { PrismaService } from "@config/prisma";
import { IOccupationEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OccupationRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getOccupation(nutritionistId: string): Promise<IOccupationEntity> {
		return this.prisma.occupation
			.findFirst({
				where: {
					nutritionistId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async updateOccupationDetail(
		nutritionistId: string,
		{ name, workPlace, experience }: Partial<IOccupationEntity>,
	): Promise<IOccupationEntity> {
		return this.prisma.occupation
			.update({
				where: {
					nutritionistId,
				},
				data: {
					name,
					workPlace,
					experience,
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
