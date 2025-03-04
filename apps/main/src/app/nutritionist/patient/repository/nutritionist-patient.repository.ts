import { Injectable, Logger } from "@nestjs/common";
import { PrismaSelector, PrismaService } from "@config/prisma";
import { IPaginationResult, IPatientEntity } from "@contract";
import { DatabaseUtil, PaginationUtil } from "@util";
import { NutritionistPatientIndexQuery } from "@app/app/nutritionist/patient/dto/query/nutritionist-patient-index.query";
import { Prisma } from "@prisma/client";
import { createDatabaseErrorHandler } from "@infrastructure";

@Injectable()
export class NutritionistPatientRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly databaseUtil: DatabaseUtil,
		private readonly paginationUtil: PaginationUtil,
	) {}

	private readonly logger = new Logger(NutritionistPatientRepository.name);

	/**
	 * Paginate patients
	 *
	 * @param query - Query to filter and sort patients
	 *
	 * @returns Paginated patients
	 */
	async paginatePatients(
		query: NutritionistPatientIndexQuery,
	): Promise<IPaginationResult<IPatientEntity>> {
		const allowToSort = [
			"profile.name",
			"medicalRecordKey.code",
			"createdAt",
			"updatedAt",
		];

		const order = this.databaseUtil.getOrderBy(
			query.sort,
			allowToSort,
			query.order,
		);

		try {
			const [totalItems, items]: [number, IPatientEntity[]] =
				await this.prisma.$transaction(async (trx) => {
					const isSearchingByMedicalRecordKey = query.search?.startsWith("RM-");

					const whereCondition: Prisma.PatientWhereInput = {
						profile: isSearchingByMedicalRecordKey
							? undefined
							: {
									name: {
										contains: query.search ?? undefined,
										mode: "insensitive",
									},
								},
						medicalRecordKey: isSearchingByMedicalRecordKey
							? {
									code: {
										contains: query.search ?? undefined,
										mode: "insensitive",
									},
								}
							: query.registered != undefined
								? query.registered
									? { isNot: null }
									: { is: null }
								: undefined,
					};

					const count = await trx.patient.count({
						where: whereCondition,
					});

					const results = await trx.patient.findMany({
						orderBy: order,
						where: whereCondition,
						select: {
							...PrismaSelector.PATIENT_WITH_PROFILE,
							medicalRecordKey: {
								select: PrismaSelector.MEDICAL_RECORD_KEY,
							},
						},
					});

					return [count, results];
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
			await createDatabaseErrorHandler(error);
		}
	}

	/**
	 * Get patient by ID
	 *
	 * @param id - Patient ID
	 *
	 * @returns Patient
	 */
	async getPatientById(id: string): Promise<IPatientEntity> {
		return this.prisma.patient.findUnique({
			where: {
				id,
			},
			select: {
				...PrismaSelector.PATIENT_WITH_PROFILE,
				medicalRecordKey: {
					select: {
						...PrismaSelector.MEDICAL_RECORD_KEY,
						patientDetail: {
							select: PrismaSelector.PATIENT_DETAIL,
						},
					},
				},
			},
		});
	}
}
