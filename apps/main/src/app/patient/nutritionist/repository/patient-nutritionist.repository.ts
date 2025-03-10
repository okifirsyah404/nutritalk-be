import { PatientNutritionistIndexQuery } from "@app/app/patient/nutritionist/dto/query/patient-nutritionist-index.query";
import { PrismaSelector, PrismaService } from "@config/prisma";
import { INutritionistEntity, IPaginationResult } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
import { ConsultationType, Prisma } from "@prisma/client";
import { DatabaseUtil, PaginationUtil } from "@util";

@Injectable()
export class PatientNutritionistRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly databaseUtil: DatabaseUtil,
		private readonly paginationUtil: PaginationUtil,
	) {}

	private readonly logger = new Logger(PatientNutritionistRepository.name);

	/**
	 * Paginates the list of nutritionists.
	 *
	 * @param query - The query parameters for pagination and filtering.
	 * @returns A promise that resolves to the pagination result containing the list of nutritionists.
	 *
	 * @remarks
	 * The function supports sorting by specific fields, and includes optional related data based on the query parameters.
	 *
	 * @example
	 * ```typescript
	 * const result = await paginate('12345', {
	 *   page: 1,
	 *   limit: 10,
	 *   sort: 'createdAt',
	 *   order: 'asc',
	 *   consultationMeta: true,
	 *   schedules: true,
	 *   price: true,
	 *   registrationCertificate: true,
	 *   occupation: true,
	 * });
	 * ```
	 */
	async paginate(
		query: PatientNutritionistIndexQuery,
	): Promise<IPaginationResult<INutritionistEntity>> {
		const allowToSort = ["profile.name", "createdAt", "updatedAt", "active"];

		const order = this.databaseUtil.getOrderBy(
			query.sort,
			allowToSort,
			query.order,
		);

		this.logger.debug(`Query: ${JSON.stringify(query)}`);

		try {
			const [totalItems, items]: [number, INutritionistEntity[]] =
				await this.prisma.$transaction(async (trx) => {
					const whereCondition: Prisma.NutritionistWhereInput = {
						profile: {
							name: {
								contains: query.search ?? undefined,
								mode: "insensitive",
							},
							gender: query.gender,
						},
						occupation: {
							experience: {
								gte: query.minExperience,
								lte: query.maxExperience,
							},
						},
						price: {
							online:
								query.consultationType === ConsultationType.ONLINE
									? {
											gte: query.minPrice,
											lte: query.maxPrice,
										}
									: undefined,
							offline:
								query.consultationType === ConsultationType.OFFLINE
									? {
											gte: query.minPrice,
											lte: query.maxPrice,
										}
									: undefined,
						},
						schedules: query.dayOfWeek
							? {
									some: {
										dayOfWeek: {
											equals: query.dayOfWeek,
										},
										active: true,
									},
								}
							: undefined,
					};

					const total = await trx.nutritionist.count({
						where: whereCondition,
					});

					const data: INutritionistEntity[] = await trx.nutritionist.findMany({
						skip: this.paginationUtil.countOffset(query),
						take: query.limit,
						orderBy: order,
						where: whereCondition,
						select: {
							...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
							consultationMeta:
								query.withConsultationMeta === true
									? {
											select: PrismaSelector.CONSULTATION_META,
										}
									: false,
							schedules:
								query.withSchedules === true
									? {
											orderBy: {
												dayOfWeekIndex: "asc",
											},
											select: PrismaSelector.SCHEDULE,
										}
									: false,
							price:
								query.withPrice === true
									? {
											select: PrismaSelector.PRICE,
										}
									: false,
							registrationCertificate:
								query.withRegistrationCertificate === true
									? {
											select: PrismaSelector.REGISTRATION_CERTIFICATE,
										}
									: false,
							occupation:
								query.withOccupation === true
									? {
											select: PrismaSelector.OCCUPATION,
										}
									: false,
						},
					});

					return [total, data];
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
		} catch (e) {
			createDatabaseErrorHandler(e);
		}
	}

	/**
	 * Retrieves a nutritionist entity by its ID.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @returns A promise that resolves to the nutritionist entity.
	 *
	 * The returned nutritionist entity includes:
	 * - Profile information as defined in `PrismaSelector.NUTRITIONIST_WITH_PROFILE`
	 * - Consultation metadata as defined in `PrismaSelector.CONSULTATION_META`
	 * - Active schedules with times as defined in `PrismaSelector.SCHEDULE_WITH_TIMES`
	 * - Price information as defined in `PrismaSelector.PRICE`
	 * - Registration certificate information as defined in `PrismaSelector.REGISTRATION_CERTIFICATE`
	 * - Occupation information as defined in `PrismaSelector.OCCUPATION`
	 */
	async getNutritionistById(
		nutritionistId: string,
		query: PatientNutritionistIndexQuery,
	): Promise<INutritionistEntity> {
		return this.prisma.nutritionist.findUnique({
			where: {
				id: nutritionistId,
			},
			select: {
				...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
				account: query.withAccount === true && {
					select: PrismaSelector.ACCOUNT,
				},
				consultationMeta: query.withConsultationMeta === true && {
					select: PrismaSelector.CONSULTATION_META,
				},
				schedules: query.withSchedules === true && {
					orderBy: {
						dayOfWeekIndex: "asc",
					},
					select: PrismaSelector.SCHEDULE_WITH_TIMES,
				},
				price: query.withPrice === true && {
					select: PrismaSelector.PRICE,
				},
				registrationCertificate: query.withRegistrationCertificate === true && {
					select: PrismaSelector.REGISTRATION_CERTIFICATE,
				},
				occupation: query.withOccupation === true && {
					select: PrismaSelector.OCCUPATION,
				},
			},
		});
	}
}
