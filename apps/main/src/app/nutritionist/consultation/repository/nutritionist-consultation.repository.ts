import { PrismaSelector, PrismaService } from "@config/prisma";
import { IConsultationEntity, IPaginationResult } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
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

		const totalItems = await this.prisma.consultation.count({
			where: {
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
			},
		});

		const items = await this.prisma.consultation.findMany({
			skip: this.paginationUtil.countOffset(query),
			take: query.limit,
			orderBy: order,
			where: {
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
			},
			select: {
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
			},
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
	}

	async getConsultationById(
		nutritionistId: string,
		consultationId: string,
	): Promise<IConsultationEntity> {
		return this.prisma.consultation
			.findFirst({
				where: {
					id: consultationId,
					nutritionist: {
						id: nutritionistId,
					},
				},
				select: {
					...PrismaSelector.CONSULTATION,
					patient: {
						select: PrismaSelector.PATIENT_WITH_PROFILE,
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
