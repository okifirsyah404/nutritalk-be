import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationReviewEntity } from "./consultation-review.entity.interface";
import { IConsultationTimeEntity } from "./consultation-time.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";
import { ITransactionPaymentEntity } from "./transaction-payment.entity.interface";
import { ITransactionPriceEntity } from "./transaction-price.entity.interface";

export interface IConsultationEntity
	extends IBaseEntity,
		Prisma.ConsultationGetPayload<{
			select: (typeof PrismaSelector)["CONSULTATION"];
		}> {
	patientId?: string;
	nutritionistId?: string;
	patient?: IPatientEntity;
	nutritionist?: INutritionistEntity;
	consultationTime?: IConsultationTimeEntity;
	transactionPrice?: ITransactionPriceEntity;
	transactionPayment?: ITransactionPaymentEntity;
	consultationReview?: IConsultationReviewEntity;
}
