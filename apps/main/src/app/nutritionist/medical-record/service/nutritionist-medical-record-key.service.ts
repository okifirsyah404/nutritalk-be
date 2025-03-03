import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { NutritionistMedicalRecordKeyRepository } from "@app/app/nutritionist/medical-record/repository/nutritionist-medical-record-key.repository";
import { IndexPaginationRequest } from "@common";
import { IMedicalRecordKeyEntity, IPaginationResult } from "@contract";
import { S3StorageService } from "@config/s3storage";
import { MedicalRecordErrorMessage } from "@constant/message";

@Injectable()
export class NutritionistMedicalRecordKeyService {
	constructor(
		private readonly repository: NutritionistMedicalRecordKeyRepository,
		private readonly s3Service: S3StorageService,
	) {}

	private readonly logger = new Logger(
		NutritionistMedicalRecordKeyService.name,
	);

	async paginate(
		query: IndexPaginationRequest,
	): Promise<IPaginationResult<IMedicalRecordKeyEntity>> {
		const result = await this.repository.paginate(query);

		const formattedData: IMedicalRecordKeyEntity[] = await Promise.all(
			result.items.map(async (item) => {
				return {
					...item,
					patient: {
						...item.patient,
						profile: {
							...item.patient.profile,
							imageKey:
								item.patient.profile.imageKey != null
									? await this.s3Service.getSignedUrl(
											item.patient.profile.imageKey,
										)
									: null,
						},
					},
				};
			}),
		);

		return {
			pagination: result.pagination,
			items: formattedData,
		};
	}

	async getMedicalRecordKey(id: string): Promise<IMedicalRecordKeyEntity> {
		const result = await this.repository.findMedicalRecordKeyById(id);

		this.logger.log(JSON.stringify(result));

		if (!result) {
			throw new NotFoundException(
				MedicalRecordErrorMessage.ERR_MEDICAL_RECORD_KEY_NOT_FOUND,
			);
		}

		return {
			...result,
			patient: {
				...result.patient,
				profile: {
					...result.patient.profile,
					imageKey:
						result.patient.profile.imageKey != null
							? await this.s3Service.getSignedUrl(
									result.patient.profile.imageKey,
								)
							: null,
				},
			},
		};
	}
}
