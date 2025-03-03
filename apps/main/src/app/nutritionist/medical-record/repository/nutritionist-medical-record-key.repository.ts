import { IndexPaginationRequest } from "@common";
import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	ICreateMedicalRecordKey,
	IMedicalRecordKeyEntity,
	IPaginationResult,
} from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
import { DatabaseUtil, PaginationUtil } from "@util";

@Injectable()
export class NutritionistMedicalRecordKeyRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly databaseUtil: DatabaseUtil,
		private readonly paginationUtil: PaginationUtil,
	) {}

	private readonly logger = new Logger(
		NutritionistMedicalRecordKeyRepository.name,
	);

	async paginate(
		query: IndexPaginationRequest,
	): Promise<IPaginationResult<IMedicalRecordKeyEntity>> {
		const allowToSort = [
			"code",
			"patient.profile.name",
			"createdAt",
			"updatedAt",
			"active",
		];

		const order = this.databaseUtil.getOrderBy(
			query.sort,
			allowToSort,
			query.order,
		);

		this.logger.debug(`Order: ${JSON.stringify(order)}`);

		const [count, results]: [number, IMedicalRecordKeyEntity[]] =
			await this.prisma.$transaction(
				async (trx) => {
					const totalItems = await trx.medicalRecordKey
						.count({})
						.catch(createDatabaseErrorHandler);

					const items: IMedicalRecordKeyEntity[] = await trx.medicalRecordKey
						.findMany({
							skip: this.paginationUtil.countOffset(query),
							take: query.limit,
							orderBy: order,
							select: {
								...PrismaSelector.MEDICAL_RECORD_KEY,
								patient: {
									select: PrismaSelector.PATIENT_WITH_PROFILE,
								},
							},
						})
						.catch(createDatabaseErrorHandler);

					return [totalItems, items];
				},
				{
					isolationLevel: "Serializable",
				},
			);

		return {
			pagination: {
				page: query.page,
				limit: query.limit,
				totalItems: count,
				totalPages: this.paginationUtil.countTotalPages({
					totalItems: count,
					limit: query.limit,
				}),
			},
			items: results,
		};
	}

	async findMedicalRecordKeyById(
		id: string,
	): Promise<IMedicalRecordKeyEntity | null> {
		return this.prisma.medicalRecordKey
			.findUnique({
				where: {
					id,
				},
				select: {
					...PrismaSelector.MEDICAL_RECORD_KEY,
					patient: {
						select: PrismaSelector.PATIENT_WITH_PROFILE,
					},
					patientDetail: {
						select: PrismaSelector.PATIENT_DETAIL,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async createMedicalRecordKey(
		data: ICreateMedicalRecordKey,
	): Promise<IMedicalRecordKeyEntity> {
		// TODO: Create medical record key, not sure if this is correct implementation
		return this.prisma.medicalRecordKey
			.create({
				data: {
					patient: data.patientId
						? {
								connect: {
									id: data.patientId,
								},
							}
						: undefined,
				},
				select: {
					...PrismaSelector.MEDICAL_RECORD_KEY,
					patient: {
						select: PrismaSelector.PATIENT_WITH_PROFILE,
					},
					patientDetail: {
						select: PrismaSelector.PATIENT_DETAIL,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
