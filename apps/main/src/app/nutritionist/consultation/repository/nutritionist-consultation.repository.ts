import { PrismaSelector, PrismaService } from "@config/prisma";
import { IConsultationEntity, IPaginationResult } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
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

	async paginate(
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
							status: "WAITING_PAYMENT",
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

		// const totalItems = await this.prisma.consultation.count({
		// 	where: {
		// 		nutritionist: {
		// 			id: nutritionistId,
		// 		},
		// 		patient: {
		// 			profile: {
		// 				name: {
		// 					contains: query.search ?? undefined,
		// 					mode: "insensitive",
		// 				},
		// 			},
		// 		},
		// 		status: query.statusFilter,
		// 		type: query.typeFilter,
		// 		consultationTime: {
		// 			start: {
		// 				gte: query.startDateFilter,
		// 			},
		// 			end: {
		// 				lte: query.endDateFilter,
		// 			},
		// 		},
		// 		NOT: {
		// 			status: TransactionStatus.WAITING_PAYMENT,
		// 		},
		// 	},
		// });

		// const items = await this.prisma.consultation.findMany({
		// 	skip: this.paginationUtil.countOffset(query),
		// 	take: query.limit,
		// 	orderBy: order,
		// 	where: {
		// 		nutritionist: {
		// 			id: nutritionistId,
		// 		},
		// 		patient: {
		// 			profile: {
		// 				name: {
		// 					contains: query.search ?? undefined,
		// 					mode: "insensitive",
		// 				},
		// 			},
		// 		},
		// 		status: query.statusFilter,
		// 		type: query.typeFilter,
		// 		consultationTime: {
		// 			start: {
		// 				gte: query.startDateFilter,
		// 			},
		// 			end: {
		// 				lte: query.endDateFilter,
		// 			},
		// 		},
		// 		NOT: {
		// 			status: TransactionStatus.WAITING_PAYMENT,
		// 		},
		// 	},
		// 	select: {
		// 		...PrismaSelector.CONSULTATION,
		// 		patient: {
		// 			select: {
		// 				...PrismaSelector.PATIENT_WITH_PROFILE,
		// 				medicalRecordKey: {
		// 					select: PrismaSelector.MEDICAL_RECORD_KEY,
		// 				},
		// 			},
		// 		},
		// 		transactionPrice: {
		// 			select: PrismaSelector.TRANSACTION_PRICE,
		// 		},
		// 		consultationTime: {
		// 			select: PrismaSelector.CONSULTATION_TIME,
		// 		},
		// 	},
		// });
	}

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
}
