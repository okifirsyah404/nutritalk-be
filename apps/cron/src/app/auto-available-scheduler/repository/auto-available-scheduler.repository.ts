import { PrismaService } from "@config/prisma";
import { DayOfWeekEnum } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AutoAvailableSchedulerRepository {
	constructor(private readonly prisma: PrismaService) {}

	async setAvailableNutritionist(dayOfWeek: DayOfWeekEnum): Promise<void> {
		await this.prisma
			.$transaction(async (trx) => {
				await trx.nutritionist.updateMany({
					data: {
						isAvailable: false,
					},
					where: {
						nutritionistSystemSetting: {
							isAutoAvailable: true,
						},
					},
				});

				await trx.nutritionist.updateMany({
					data: {
						isAvailable: true,
					},
					where: {
						schedules: {
							some: {
								dayOfWeek,
								active: true,
							},
						},
						nutritionistSystemSetting: {
							isAutoAvailable: true,
						},
					},
				});
			})
			.catch(createDatabaseErrorHandler);
	}

	async setUnavailableNutritionist(): Promise<void> {
		await this.prisma.nutritionist
			.updateMany({
				data: {
					isAvailable: false,
				},
				where: {
					nutritionistSystemSetting: {
						isAutoAvailable: true,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
