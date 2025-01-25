import { PrismaSelector, PrismaService } from "@config/prisma";
import { INutritionistEntity, ITransactionEntity } from "@contract";
import { Injectable } from "@nestjs/common";
import { TransactionStatus } from "@prisma/client";

@Injectable()
export class DashboardRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getProfile(id: string): Promise<INutritionistEntity> {
		return this.prisma.nutritionist.findUnique({
			where: {
				id: id,
			},
			select: {
				...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
				consultationMeta: {
					select: PrismaSelector.CONSULTATION_META,
				},
			},
		});
	}

	async getNearbyScheduledConsultations(
		id: string,
	): Promise<ITransactionEntity[]> {
		return this.prisma.transaction.findMany({
			where: {
				AND: [
					{
						nutritionistId: id,
					},
					{
						status: TransactionStatus.SCHEDULED,
					},
				],
			},
			orderBy: {
				consultationTime: {
					start: "asc",
				},
			},
			take: 4,
			select: {
				...PrismaSelector.TRANSACTION,
				consultationTime: {
					select: PrismaSelector.CONSULTATION_TIME,
				},
			},
		});
	}

	async countNearbyScheduledConsultations(id: string): Promise<number> {
		return this.prisma.transaction.count({
			where: {
				AND: [
					{
						nutritionistId: id,
					},
					{
						status: TransactionStatus.SCHEDULED,
					},
				],
			},
		});
	}

	async getPendingConsultations(id: string): Promise<ITransactionEntity[]> {
		return this.prisma.transaction.findMany({
			where: {
				AND: [
					{
						nutritionistId: id,
					},
					{
						status: TransactionStatus.WAITING_CONFIRMATION,
					},
				],
			},
			orderBy: {
				createdAt: "asc",
			},
			take: 4,
			select: {
				...PrismaSelector.TRANSACTION,
				consultationTime: {
					select: PrismaSelector.CONSULTATION_TIME,
				},
			},
		});
	}

	async countPendingConsultations(id: string): Promise<number> {
		return this.prisma.transaction.count({
			where: {
				AND: [
					{
						nutritionistId: id,
					},
					{
						status: TransactionStatus.WAITING_CONFIRMATION,
					},
				],
			},
		});
	}
}
