import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistPatientRepository } from "@app/app/nutritionist/patient/repository/nutritionist-patient.repository";
import { NutritionistPatientIndexQuery } from "@app/app/nutritionist/patient/dto/query/nutritionist-patient-index.query";
import { IPaginationResult, IPatientEntity } from "@contract";
import { S3StorageService } from "@config/s3storage";
import { PatientErrorMessage } from "@constant/message";

@Injectable()
export class NutritionistPatientService {
	constructor(
		private readonly repository: NutritionistPatientRepository,
		private readonly s3StorageService: S3StorageService,
	) {}

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
		const result = await this.repository.paginatePatients(query);

		const formattedData: IPatientEntity[] = await Promise.all(
			result.items.map(async (item) => {
				return {
					...item,
					profile: {
						...item.profile,
						imageKey: await this.s3StorageService.getSignedUrl(
							item.profile.imageKey,
						),
					},
				};
			}),
		);

		return {
			pagination: result.pagination,
			items: formattedData,
		};
	}

	/**
	 * Get patient by id
	 *
	 * @param id - Patient id
	 *
	 * @returns Patient
	 */
	async getPatientById(id: string): Promise<IPatientEntity> {
		const result = await this.repository.getPatientById(id);

		if (!result) {
			throw new NotFoundException(PatientErrorMessage.ERR_PATIENT_NOT_FOUND);
		}

		return {
			...result,
			profile: {
				...result.profile,
				imageKey: await this.s3StorageService.getSignedUrl(
					result.profile.imageKey,
				),
			},
		};
	}
}
