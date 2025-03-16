import { S3StorageService } from "@config/s3storage";
import { ConsultationErrorMessage } from "@constant/message";
import {
	IConsultationEntity,
	ICreateConsultationOrderRequest,
	IPaginationResult,
} from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { TransactionStatus } from "@prisma/client";
import moment from "moment";
import { NutritionistConsultationIndexQuery } from "../dto/query/nutritionist-consultation-index.query";
import { NutritionistConsultationRepository } from "../repository/nutritionist-consultation.repository";

@Injectable()
export class NutritionistConsultationService {
	constructor(
		private readonly repository: NutritionistConsultationRepository,
		private readonly storageService: S3StorageService,
	) {}

	/**
	 * Paginate consultations for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param query - Query parameters for pagination and filtering
	 * @returns Paginated result of consultations
	 */
	async paginateConsultation(
		nutritionistId: string,
		query: NutritionistConsultationIndexQuery,
	): Promise<IPaginationResult<IConsultationEntity>> {
		const result = await this.repository.paginateConsultations(
			nutritionistId,
			query,
		);
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

	/**
	 * Get a consultation by ID for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param consultationId - ID of the consultation
	 * @returns Consultation entity
	 */
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

	/**
	 * Set a consultation status as finished for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param consultationId - ID of the consultation
	 * @returns Consultation entity
	 */
	async setConsultationStatusAsScheduled(
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

		return this.repository.updateConsultation(nutritionistId, consultationId, {
			status: TransactionStatus.SCHEDULED,
		});
	}

	/**
	 * Set a consultation status as finished for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param consultationId - ID of the consultation
	 * @returns Consultation entity
	 */
	async setConsultationStatusAsFinished(
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

		return this.repository.updateConsultation(nutritionistId, consultationId, {
			status: TransactionStatus.FINISHED,
		});
	}

	/**
	 * Set a consultation status as canceled for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param consultationId - ID of the consultation
	 * @returns Consultation entity
	 */
	async setConsultationStatusAsCanceled(
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

		return this.repository.updateConsultation(nutritionistId, consultationId, {
			status: TransactionStatus.CANCELED,
		});
	}

	/**
	 * Reschedule a consultation for a nutritionist
	 * @param nutritionistId - ID of the nutritionist
	 * @param consultationId - ID of the consultation
	 * @param reqData - Request data containing new start and end times
	 * @returns Updated consultation entity
	 */
	async rescheduleConsultation(
		nutritionistId: string,
		consultationId: string,
		reqData: Pick<ICreateConsultationOrderRequest, "start" | "duration">,
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

		const newEnd = moment(reqData.start)
			.add(reqData.duration, "minutes")
			.toDate();

		return this.repository.updateConsultation(nutritionistId, consultationId, {
			start: reqData.start,
			end: newEnd,
		});
	}
}
