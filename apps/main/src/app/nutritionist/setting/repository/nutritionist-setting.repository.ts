import { PrismaSelector, PrismaService } from "@config/prisma";
import { INutritionistSystemSettingEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistSettingRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findNutritionistSetting(
		nutritionistId: string,
	): Promise<INutritionistSystemSettingEntity> {
		return await this.prisma.nutritionistSystemSetting
			.findUnique({
				where: {
					nutritionistId,
				},
				select: PrismaSelector.NUTRITIONIST_SYSTEM_SETTING,
			})
			.catch(createDatabaseErrorHandler);
	}

	async updateNutritionistSetting(
		nutritionistId: string,
		data: Partial<INutritionistSystemSettingEntity>,
	): Promise<INutritionistSystemSettingEntity> {
		return await this.prisma
			.$transaction(async (trx) => {
				const currentSetting = await trx.nutritionistSystemSetting.findUnique({
					where: {
						nutritionistId,
					},
					select: PrismaSelector.NUTRITIONIST_SYSTEM_SETTING,
				});

				return trx.nutritionistSystemSetting.update({
					where: {
						id: currentSetting.id,
					},
					data: {
						isAutoAvailable: data.isAutoAvailable,
					},
					select: PrismaSelector.NUTRITIONIST_SYSTEM_SETTING,
				});
			})
			.catch(createDatabaseErrorHandler);
	}
}
