import { SetCache } from "@config/app-cache";
import { S3StorageService } from "@config/s3storage";
import { ConsultationErrorMessage } from "@constant/message";
import { IConsultationEntity, IPaginationResult } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientConsultationIndexQuery } from "../dto/query/patient-consultation-index.query";
import { PatientConsultationRepository } from "../repository/patient-consultation.repository";

@Injectable()
export class PatientConsultationService {
	constructor(
		private readonly repository: PatientConsultationRepository,
		private readonly storageService: S3StorageService,
	) {}

	/**
	 * @description Get all consultations for a patient
	 *
	 * @param {string} patientId
	 * @param {PatientConsultationIndexQuery} query
	 * @returns {Promise<IPaginationResult<IConsultationEntity>>}
	 */
	async paginateConsultation(
		patientId: string,
		query: PatientConsultationIndexQuery,
	): Promise<IPaginationResult<IConsultationEntity>> {
		const result = await this.repository.paginateConsultations(
			patientId,
			query,
		);
		const formattedData = await Promise.all(
			result.items.map(async (item) => ({
				...item,
				nutritionist: {
					...item.nutritionist,
					profile: {
						...item.nutritionist.profile,
						imageKey:
							item.nutritionist.profile.imageKey != null
								? await this.storageService.getSignedUrl(
										item.nutritionist.profile.imageKey,
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

	/**
	 * @description Get consultation by id
	 *
	 * @param {string} patientId
	 * @param {string} consultationId
	 * @returns {Promise<IConsultationEntity>}
	 */
	@SetCache(
		(patientId: string, consultationId: string) =>
			`consultation:${patientId}:${consultationId}`,
		{
			ttl: 1,
			unit: "minutes",
		},
	)
	async getConsultationById(
		patientId: string,
		consultationId: string,
	): Promise<IConsultationEntity> {
		const consultation = await this.repository.getConsultationById(
			patientId,
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
