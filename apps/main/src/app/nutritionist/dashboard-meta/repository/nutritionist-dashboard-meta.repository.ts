import { Injectable } from "@nestjs/common";
import { PrismaService } from "@config/prisma";
import { INutritionistDashboardMeta } from "@contract";
import { TransactionStatus } from "@prisma/client";
import { createDatabaseErrorHandler } from "@infrastructure";

@Injectable()
export class NutritionistDashboardMetaRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getNutritionistDashboardMeta(
		nutritionistId: string,
	): Promise<INutritionistDashboardMeta> {
		const waitingConfirmationConsultation = await this._countConsultation(
			nutritionistId,
			TransactionStatus.WAITING_CONFIRMATION,
		);

		const scheduledConsultation = await this._countConsultation(
			nutritionistId,
			TransactionStatus.SCHEDULED,
		);

		const reScheduledConsultation = await this._countConsultation(
			nutritionistId,
			TransactionStatus.RE_SCHEDULED,
		);

		const finishedConsultation = await this._countConsultation(
			nutritionistId,
			TransactionStatus.FINISHED,
		);

		const cancelledConsultation = await this._countConsultation(
			nutritionistId,
			TransactionStatus.CANCELED,
		);

		const totalConsultation = await this._countConsultation(nutritionistId);

		return {
			waitingConfirmationConsultation,
			scheduledConsultation,
			reScheduledConsultation,
			finishedConsultation,
			cancelledConsultation,
			totalConsultation,
		};
	}

	private async _countConsultation(
		nutritionistId: string,
		status?: TransactionStatus,
	): Promise<number> {
		return this.prisma.consultation
			.count({
				where: {
					nutritionistId,
					status: status,
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
