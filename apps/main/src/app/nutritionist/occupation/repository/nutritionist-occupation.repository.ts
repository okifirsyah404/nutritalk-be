import { PrismaService } from "@config/prisma";
import { IOccupationEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistOccupationRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Finds the occupation entity associated with a given nutritionist ID.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose occupation is to be retrieved.
	 * @returns A promise that resolves to the occupation entity associated with the given nutritionist ID.
	 * @throws Will throw an error if the database query fails.
	 */
	async findOccupationByNutritionistId(
		nutritionistId: string,
	): Promise<IOccupationEntity> {
		return this.prisma.occupation
			.findFirst({
				where: {
					nutritionistId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Updates the occupation details of a nutritionist.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @param occupationDetails - An object containing the occupation details to be updated.
	 * @param occupationDetails.name - The name of the occupation.
	 * @param occupationDetails.workPlace - The workplace of the nutritionist.
	 * @param occupationDetails.experience - The experience of the nutritionist in years.
	 * @returns A promise that resolves to the updated occupation entity.
	 * @throws Will throw an error if the update operation fails.
	 */
	async updateOccupation(
		nutritionistId: string,
		{
			name,
			workPlace,
			experience,
		}: Partial<Pick<IOccupationEntity, "name" | "workPlace" | "experience">>,
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
