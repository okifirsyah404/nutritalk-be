import { PrismaSelector, PrismaService } from "@config/prisma";
import { IConsultationEntity, IPaginationResult } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseUtil, PaginationUtil } from "@util";
import { PatientConsultationIndexQuery } from "../dto/query/patient-consultation-index.query";

@Injectable()
export class PatientConsultationRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly databaseUtil: DatabaseUtil,
		private readonly paginationUtil: PaginationUtil,
	) {}

	private readonly logger = new Logger(PatientConsultationRepository.name);

	/**
	 * @description Get all consultations for a patient
	 *
	 * @param {string} patientId
	 * @param {PatientConsultationIndexQuery} query
	 * @returns {Promise<IPaginationResult<IConsultationEntity>>}
	 */
	async paginateConsultations(
		patientId: string,
		query: PatientConsultationIndexQuery,
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
						patient: {
							id: patientId,
						},
						nutritionist: {
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
							nutritionist: {
								select: {
									...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
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
	 * @description Get consultation by id
	 *
	 * @param {string} patientId
	 * @param {string} consultationId
	 * @returns {Promise<IConsultationEntity>}
	 */
	async getConsultationById(
		patientId: string,
		consultationId: string,
	): Promise<IConsultationEntity> {
		return this.prisma.consultation
			.findUnique({
				where: {
					id: consultationId,
					patientId: patientId,
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
