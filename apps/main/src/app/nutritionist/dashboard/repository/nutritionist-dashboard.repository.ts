import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	INutritionistDashboardConsultationResponse,
	INutritionistDashboardMeta,
	INutritionistEntity,
} from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";
import { Prisma, TransactionStatus } from "@prisma/client";

@Injectable()
export class NutritionistDashboardRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Retrieves a nutritionist profile by its unique identifier.
	 *
	 * @param id - The unique identifier of the nutritionist profile.
	 * @returns A promise that resolves to the nutritionist profile object.
	 */
	async findProfileById(nutritionistId: string): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
			.findUnique({
				where: {
					id: nutritionistId,
				},
				select: {
					...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					account: {
						select: PrismaSelector.ACCOUNT,
					},
					consultationMeta: {
						select: PrismaSelector.CONSULTATION_META,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Counts the number of consultations for a given nutritionist ID.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @returns A promise that resolves to an object containing the counts of different consultation statuses.
	 */
	async countConsultations(
		nutritionistId: string,
	): Promise<INutritionistDashboardMeta> {
		const [
			waitingConfirmationConsultation,
			scheduledConsultation,
			reScheduledConsultation,
			finishedConsultation,
			cancelledConsultation,
			totalConsultation,
		] = await this.prisma.$transaction([
			this.prisma.consultation.count({
				where: {
					nutritionistId,
					status: TransactionStatus.WAITING_CONFIRMATION,
				},
			}),
			this.prisma.consultation.count({
				where: {
					nutritionistId,
					status: TransactionStatus.SCHEDULED,
				},
			}),
			this.prisma.consultation.count({
				where: {
					nutritionistId,
					status: TransactionStatus.RE_SCHEDULED,
				},
			}),
			this.prisma.consultation.count({
				where: {
					nutritionistId,
					status: TransactionStatus.FINISHED,
				},
			}),
			this.prisma.consultation.count({
				where: {
					nutritionistId,
					status: TransactionStatus.CANCELED,
				},
			}),
			this.prisma.consultation.count({
				where: {
					nutritionistId,
				},
			}),
		]);

		return {
			waitingConfirmationConsultation,
			scheduledConsultation,
			reScheduledConsultation,
			finishedConsultation,
			cancelledConsultation,
			totalConsultation,
		};
	}

	/**
	 * Retrieves consultations for a given nutritionist ID.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @returns A promise that resolves to an object containing the consultations grouped by status.
	 */
	async findConsultations(
		nutritionistId: string,
	): Promise<INutritionistDashboardConsultationResponse> {
		const result = await this.prisma.$transaction(async (trx) => {
			const selectConsultation: Prisma.ConsultationSelect = {
				...PrismaSelector.CONSULTATION,
				patient: {
					select: PrismaSelector.PATIENT_WITH_PROFILE,
				},
				transactionPrice: {
					select: PrismaSelector.TRANSACTION_PRICE,
				},
				consultationTime: {
					select: PrismaSelector.CONSULTATION_TIME,
				},
				transactionPayment: {
					select: PrismaSelector.TRANSACTION_PAYMENT,
				},
				consultationReview: {
					select: PrismaSelector.CONSULTATION_REVIEW,
				},
			};

			const ongoingConsultations = await trx.consultation.findMany({
				orderBy: {
					trId: "desc",
				},
				take: 3,
				where: {
					nutritionistId,
					status: TransactionStatus.ON_PROCESS,
				},
				select: selectConsultation,
			});

			const scheduledConsultations = await trx.consultation.findMany({
				orderBy: {
					trId: "desc",
				},
				take: 3,
				where: {
					nutritionistId,
					status: TransactionStatus.SCHEDULED,
				},
				select: selectConsultation,
			});

			const waitingConfirmConsultations = await trx.consultation.findMany({
				orderBy: {
					trId: "desc",
				},
				take: 3,
				where: {
					nutritionistId,
					status: TransactionStatus.WAITING_CONFIRMATION,
				},
				select: selectConsultation,
			});

			const finishedConsultations = await trx.consultation.findMany({
				orderBy: {
					trId: "desc",
				},
				take: 3,
				where: {
					nutritionistId,
					status: TransactionStatus.FINISHED,
				},
				select: selectConsultation,
			});

			return {
				ongoingConsultations,
				scheduledConsultations,
				waitingConfirmConsultations,
				finishedConsultations,
			};
		});

		return {
			ongoingConsultations: result.ongoingConsultations,
			scheduledConsultations: result.scheduledConsultations,
			waitingConfirmConsultations: result.waitingConfirmConsultations,
			finishedConsultations: result.finishedConsultations,
		};
	}
}
