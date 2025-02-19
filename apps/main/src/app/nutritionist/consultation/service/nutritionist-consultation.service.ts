import { S3StorageService } from "@config/s3storage";
import { IConsultationEntity, IPaginationResult } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistConsultationIndexQuery } from "../dto/query/nutritionist-consultation-index.query";
import { NutritionistConsultationRepository } from "../repository/nutritionist-consultation.repository";
import { ConsultationErrorMessage } from "@constant/message";

@Injectable()
export class NutritionistConsultationService {
	constructor(
		private readonly repository: NutritionistConsultationRepository,
		private readonly storageService: S3StorageService,
	) {}

	async paginateConsultation(
		nutritionistId: string,
		query: NutritionistConsultationIndexQuery,
	): Promise<IPaginationResult<IConsultationEntity>> {
		const result = await this.repository.paginate(nutritionistId, query);
		const formattedData = await Promise.all(
			result.items.map(async (item) => ({
				...item,
				patient: {
					...item.patient,
					profile: {
						...item.patient.profile,
						imageKey:
							item.patient.profile.imageKey != null
								? await this.storageService.getSignedUrl(
										item.patient.profile.imageKey,
									)
								: null,
					},
				},
			})),
		);

		return {
			pagination: result.pagination,
			items: formattedData,
		};
	}

	async getConsultationById(
		nutritionistId: string,
		consultationId: string,
	): Promise<IConsultationEntity> {
		const consultation = await this.repository.getConsultationById(
			nutritionistId,
			consultationId,
		);

		if (!consultation) {
			throw new NotFoundException(
				ConsultationErrorMessage.ERR_CONSULTATION_NOT_FOUND,
			);
		}

		return {
			...consultation,
			patient: {
				...consultation.patient,
				profile: {
					...consultation.patient.profile,
					imageKey:
						consultation.patient.profile.imageKey != null
							? await this.storageService.getSignedUrl(
									consultation.patient.profile.imageKey,
								)
							: null,
				},
			},
			nutritionist: {
				...consultation.nutritionist,
				profile: {
					...consultation.nutritionist.profile,
					imageKey:
						consultation.nutritionist.profile.imageKey != null
							? await this.storageService.getSignedUrl(
									consultation.nutritionist.profile.imageKey,
								)
							: null,
				},
			},
		};
	}
}
