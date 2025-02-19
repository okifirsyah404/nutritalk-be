import {
	IConsultationEntity,
	IConsultationReviewEntity,
	IConsultationTimeEntity,
	INutritionistEntity,
	IPatientEntity,
	ITransactionPaymentEntity,
	ITransactionPriceEntity,
} from "@contract";
import { ConsultationType, TransactionStatus } from "@prisma/client";

export class NutritionistConsultationResponse implements IConsultationEntity {
	private constructor(entity: IConsultationEntity) {
		this.id = entity.id;
		this.trId = entity.trId;
		this.status = entity.status;
		this.type = entity.type;
		this.note = entity.note;
		this.createdAt = entity.createdAt;
		this.updatedAt = entity.updatedAt;
		this.patient = entity.patient;
		this.nutritionist = entity.nutritionist;
		this.transactionPrice = entity.transactionPrice;
		this.transactionPayment = entity.transactionPayment;
		this.consultationTime = entity.consultationTime;
		this.consultationReview = entity.consultationReview;
	}

	id: string;
	trId: string;
	status: TransactionStatus;
	type: ConsultationType;
	note: string | null;
	createdAt?: Date;
	updatedAt?: Date;
	patient?: IPatientEntity;
	nutritionist?: INutritionistEntity;
	transactionPrice?: ITransactionPriceEntity;
	transactionPayment?: ITransactionPaymentEntity;
	consultationTime?: IConsultationTimeEntity;
	consultationReview?: IConsultationReviewEntity;

	static fromEntity(
		entity: IConsultationEntity,
	): NutritionistConsultationResponse {
		return new NutritionistConsultationResponse(entity);
	}

	static fromEntities(
		entities: IConsultationEntity[],
	): NutritionistConsultationResponse[] {
		return entities.map((entity) =>
			NutritionistConsultationResponse.fromEntity(entity),
		);
	}
}
