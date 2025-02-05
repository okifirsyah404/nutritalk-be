import { PrismaSelector, PrismaService } from "@config/prisma";
import { INutritionistEntity, IPaginationResult } from "@contract";
import { Injectable, Logger } from "@nestjs/common";
import { DatabaseUtil, PaginationUtil } from "@util";
import { NutritionistIndexQuery } from "../dto/query/nutritionist-index.query";

@Injectable()
export class NutritionistRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly databaseUtil: DatabaseUtil,
		private readonly paginationUtil: PaginationUtil,
	) {}

	private readonly logger = new Logger(NutritionistRepository.name);

	/**
	 * Paginates the list of nutritionists, excluding the one with the given ID (if enabled).
	 *
	 * @param nutritionistId - The ID of the nutritionist to exclude from the results (if enabled).
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
		nutritionistId: string,
		query: NutritionistIndexQuery,
	): Promise<IPaginationResult<INutritionistEntity>> {
		const allowToSort = ["profile.name", "createdAt", "updatedAt", "active"];

		const order = this.databaseUtil.getOrderBy(
			query.sort,
			allowToSort,
			query.order,
		);

		const totalItems = await this.prisma.nutritionist.count({
			where: {
				profile: {
					name: {
						contains: query.search ?? undefined,
						mode: "insensitive",
					},
				},
				NOT: query.excludeSelf ? { id: nutritionistId } : undefined,
			},
		});

		const items = await this.prisma.nutritionist.findMany({
			skip: this.paginationUtil.countOffset(query),
			take: query.limit,
			orderBy: order,
			where: {
				profile: {
					name: {
						contains: query.search ?? undefined,
						mode: "insensitive",
					},
				},
				NOT: query.excludeSelf ? { id: nutritionistId } : undefined,
			},
			select: {
				...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
				consultationMeta: query.consultationMeta && {
					select: PrismaSelector.CONSULTATION_META,
				},
				schedules: query.schedules && {
					select: PrismaSelector.SCHEDULE,
				},
				price: query.price && {
					select: PrismaSelector.PRICE,
				},
				registrationCertificate: query.registrationCertificate && {
					select: PrismaSelector.REGISTRATION_CERTIFICATE,
				},
				occupation: query.occupation && {
					select: PrismaSelector.OCCUPATION,
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
	): Promise<INutritionistEntity> {
		return this.prisma.nutritionist.findUnique({
			where: {
				id: nutritionistId,
			},
			select: {
				...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
				consultationMeta: {
					select: PrismaSelector.CONSULTATION_META,
				},
				schedules: {
					select: PrismaSelector.SCHEDULE_WITH_TIMES,
					where: {
						active: true,
					},
				},
				price: {
					select: PrismaSelector.PRICE,
				},
				registrationCertificate: {
					select: PrismaSelector.REGISTRATION_CERTIFICATE,
				},
				occupation: {
					select: PrismaSelector.OCCUPATION,
				},
			},
		});
	}
}
