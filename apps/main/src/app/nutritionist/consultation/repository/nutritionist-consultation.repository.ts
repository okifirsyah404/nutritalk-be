import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	IConsultationEntity,
	IConsultationTimeEntity,
	IPaginationResult,
} from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
import { CreditAction, Prisma, TransactionStatus } from "@prisma/client";
import { DatabaseUtil, PaginationUtil } from "@util";
import { NutritionistConsultationIndexQuery } from "../dto/query/nutritionist-consultation-index.query";

@Injectable()
export class NutritionistConsultationRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly databaseUtil: DatabaseUtil,
		private readonly paginationUtil: PaginationUtil,
	) {}

	private readonly logger = new Logger(NutritionistConsultationRepository.name);

	/**
	 * Paginate consultations for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param query - Query parameters for pagination and filtering
	 * @returns Paginated result of consultations
	 */
	async paginateConsultations(
		nutritionistId: string,
		query: NutritionistConsultationIndexQuery,
	): Promise<IPaginationResult<IConsultationEntity>> {
		const allowToSort = [
			"trId",
			"createdAt",
			"updatedAt",
			"status",
			"type",
			"consultationTime.start",
			"consultationTime.end",
			"patient.profile.name",
		];

		const order = this.databaseUtil.getOrderBy(
			query.sort,
			allowToSort,
			query.order,
		);

		try {
			const [totalItems, items]: [number, IConsultationEntity[]] =
				await this.prisma.$transaction(async (trx) => {
					const whereCondition: Prisma.ConsultationWhereInput = {
						nutritionist: {
							id: nutritionistId,
						},
						patient: {
							profile: {
								name: {
									contains: query.search ?? undefined,
									mode: "insensitive",
								},
							},
						},
						status: query.statusFilter,
						type: query.typeFilter,
						consultationTime: {
							start: {
								gte: query.startDateFilter,
							},
							end: {
								lte: query.endDateFilter,
							},
						},
						NOT: {
							status: {
								in: [
									TransactionStatus.WAITING_PAYMENT,
									TransactionStatus.CANCELED_PAYMENT,
								],
							},
						},
					};

					const count = await trx.consultation.count({
						where: whereCondition,
					});

					const data = await trx.consultation.findMany({
						skip: this.paginationUtil.countOffset(query),
						take: query.limit,
						orderBy: order,
						where: whereCondition,
						select: {
							...PrismaSelector.CONSULTATION,
							patient: {
								select: {
									...PrismaSelector.PATIENT_WITH_PROFILE,
									medicalRecordKey: {
										select: PrismaSelector.MEDICAL_RECORD_KEY,
									},
								},
							},
							transactionPrice: {
								select: PrismaSelector.TRANSACTION_PRICE,
							},
							consultationTime: {
								select: PrismaSelector.CONSULTATION_TIME,
							},
						},
					});

					return [count, data];
				});

			return {
				pagination: {
					page: query.page,
					limit: query.limit,
					totalItems,
					totalPages: this.paginationUtil.countTotalPages({
						totalItems,
						limit: query.limit,
					}),
				},
				items,
			};
		} catch (error) {
			createDatabaseErrorHandler(error);
		}
	}

	/**
	 * Get a consultation by ID for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param consultationId - ID of the consultation
	 * @returns Consultation entity
	 */
	async getConsultationById(
		nutritionistId: string,
		consultationId: string,
	): Promise<IConsultationEntity> {
		return this.prisma.consultation
			.findUnique({
				where: {
					id: consultationId,
					nutritionistId,
				},
				select: {
					...PrismaSelector.CONSULTATION,
					patient: {
						select: {
							...PrismaSelector.PATIENT_WITH_PROFILE,
							medicalRecordKey: {
								select: PrismaSelector.MEDICAL_RECORD_KEY,
							},
						},
					},
					nutritionist: {
						select: PrismaSelector.NUTRITIONIST_WITH_PROFILE,
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
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async updateConsultation(
		nutritionistId: string,
		consultationId: string,
		data: Partial<
			Pick<IConsultationEntity, "status" | "nutritionistNote"> &
				Pick<IConsultationTimeEntity, "start" | "end">
		>,
	): Promise<IConsultationEntity> {
		return this.prisma
			.$transaction(async (trx) => {
				const consultation = await trx.consultation.findUnique({
					where: {
						id: consultationId,
						nutritionistId,
					},
					select: {
						...PrismaSelector.CONSULTATION,
						patientId: true,
						transactionPayment: {
							select: PrismaSelector.TRANSACTION_PAYMENT,
						},
						transactionPrice: {
							select: PrismaSelector.TRANSACTION_PRICE,
						},
					},
				});

				await trx.consultation.update({
					where: {
						id: consultation.id,
						nutritionistId,
					},
					data: {
						status: data.status ?? consultation.status,
						nutritionistNote: data.nutritionistNote,
					},
				});

				if (data.status === TransactionStatus.CANCELED) {
					const credit = await trx.credit.findUnique({
						where: {
							patientId: consultation.patientId,
						},
						select: {
							id: true,
							balance: true,
						},
					});

					await trx.credit.update({
						where: {
							id: credit.id,
						},
						data: {
							balance: {
								increment: consultation.transactionPrice.price,
							},
							creditHistories: {
								create: {
									action: CreditAction.REFUND,
									amount: consultation.transactionPrice.price,
									note: `Refund for consultation ${consultation.trId}, consultation cancelled by nutritionist`,
								},
							},
						},
					});
				}

				if (data.start && data.end) {
					await trx.consultationTime.update({
						where: {
							consultationId: consultation.id,
						},
						data: {
							start: data.start,
							end: data.end,
						},
					});

					await trx.consultation.update({
						where: {
							id: consultation.id,
							nutritionistId,
						},
						data: {
							status: TransactionStatus.RE_SCHEDULED,
						},
					});
				}

				return trx.consultation.findUnique({
					where: {
						id: consultation.id,
						nutritionistId,
					},
					select: {
						...PrismaSelector.CONSULTATION,
						patient: {
							select: {
								...PrismaSelector.PATIENT_WITH_PROFILE,
								medicalRecordKey: {
									select: PrismaSelector.MEDICAL_RECORD_KEY,
								},
							},
						},
						nutritionist: {
							select: PrismaSelector.NUTRITIONIST_WITH_PROFILE,
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
					},
				});
			})
			.catch(createDatabaseErrorHandler);
	}
}
