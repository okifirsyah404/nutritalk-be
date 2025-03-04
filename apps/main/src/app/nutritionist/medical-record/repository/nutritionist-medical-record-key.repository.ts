import { IndexPaginationRequest } from "@common";
import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	IAnthropometricEntity,
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
		const result: IMedicalRecordKeyEntity = await this.prisma.$transaction(
			async (trx) => {
				const anthropometric =
					data.height || data.weight
						? await trx.anthropometric.create({
								data: {
									height: data.height,
									weight: data.weight,
									bmi: data.bmi,
									bmiStatus: data.bmiStatus,
								},
								select: {
									id: true,
								},
							})
						: undefined;

				const patient = data.patientId
					? await trx.patient.findUnique({
							where: {
								id: data.patientId,
							},
							select: PrismaSelector.PATIENT_WITH_PROFILE,
						})
					: undefined;

				const patientDetail =
					data.dailyCalories || data.activityLevel || patient
						? await trx.patientDetail.create({
								data: {
									dailyCalories: data?.dailyCalories,
									activityLevel: data?.activityLevel,
									name: patient?.profile.name,
									gender: patient?.profile.gender,
									dateOfBirth: patient?.profile.dateOfBirth,
									age: patient?.profile.age,
									anthropometric: anthropometric
										? {
												connect: {
													id: anthropometric.id,
												},
											}
										: undefined,
								},
							})
						: undefined;

				const medicalRecordKey = await trx.medicalRecordKey.create({
					data: {
						patient: patient
							? {
									connect: {
										id: patient.id,
									},
								}
							: undefined,
						patientDetail: patientDetail
							? {
									connect: {
										id: patientDetail.id,
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
				});

				return medicalRecordKey;
			},
			{
				isolationLevel: "Serializable",
			},
		);

		return result;
	}

	async bindMedicalRecordKeyToPatient({
		medicalRecordKeyId,
		patientId,
		anthropometricData,
	}: {
		medicalRecordKeyId: string;
		patientId: string;
		anthropometricData: Partial<
			Pick<IAnthropometricEntity, "height" | "weight" | "bmi" | "bmiStatus">
		>;
	}): Promise<IMedicalRecordKeyEntity> {
		const result: IMedicalRecordKeyEntity = await this.prisma.$transaction(
			async (trx) => {
				const patient = await trx.patient.findUnique({
					where: {
						id: patientId,
					},
					select: PrismaSelector.PATIENT_WITH_PROFILE,
				});

				const anthropometric =
					anthropometricData.height || anthropometricData.weight
						? await trx.anthropometric.create({
								data: {
									height: anthropometricData.height,
									weight: anthropometricData.weight,
									bmi: anthropometricData.bmi,
									bmiStatus: anthropometricData.bmiStatus,
								},
								select: {
									id: true,
								},
							})
						: undefined;

				const patientDetail = await trx.patientDetail.create({
					data: {
						name: patient.profile.name,
						gender: patient.profile.gender,
						dateOfBirth: patient.profile.dateOfBirth,
						age: patient.profile.age,
						anthropometric: anthropometric
							? {
									connect: {
										id: anthropometric.id,
									},
								}
							: undefined,
					},
				});

				const medicalRecordKey = await trx.medicalRecordKey.update({
					where: {
						id: medicalRecordKeyId,
					},
					data: {
						patient: {
							connect: {
								id: patientId,
							},
						},
						patientDetail: {
							connect: {
								id: patientDetail.id,
							},
						},
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
				});

				return medicalRecordKey;
			},
		);
		return result;
	}

	async unbindMedicalRecordKeyFromPatient(
		medicalRecordKeyId: string,
	): Promise<IMedicalRecordKeyEntity> {
		const result: IMedicalRecordKeyEntity = await this.prisma.$transaction(
			async (trx) => {
				const medicalRecordKey = await trx.medicalRecordKey.update({
					where: {
						id: medicalRecordKeyId,
					},
					data: {
						patient: {
							disconnect: true,
						},
						patientDetail: {
							disconnect: true,
						},
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
				});

				return medicalRecordKey;
			},
		);

		return result;
	}
}
