import { PrismaSelector, PrismaService } from "@config/prisma";
import { IConsultationEntity, INutritionistEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";
import { TransactionStatus } from "@prisma/client";

@Injectable()
export class DashboardRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getProfile(id: string): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
			.findUnique({
				where: {
					id: id,
				},
				select: {
					...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					consultationMeta: {
						select: PrismaSelector.CONSULTATION_META,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async getNearbyScheduledConsultations(
		id: string,
	): Promise<IConsultationEntity[]> {
		return this.prisma.consultation
			.findMany({
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
					...PrismaSelector.CONSULTATION,
					consultationTime: {
						select: PrismaSelector.CONSULTATION_TIME,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async countNearbyScheduledConsultations(id: string): Promise<number> {
		return this.prisma.consultation
			.count({
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
			})
			.catch(createDatabaseErrorHandler);
	}

	async getPendingConsultations(id: string): Promise<IConsultationEntity[]> {
		return this.prisma.consultation
			.findMany({
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
					...PrismaSelector.CONSULTATION,
					consultationTime: {
						select: PrismaSelector.CONSULTATION_TIME,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async countPendingConsultations(id: string): Promise<number> {
		return this.prisma.consultation
			.count({
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
			})
			.catch(createDatabaseErrorHandler);
	}
}
