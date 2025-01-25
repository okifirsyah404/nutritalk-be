import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationReviewEntity } from "./consultation-review.entity.interface";
import { IConsultationTimeEntity } from "./consultation-time.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";
import { ITransactionPaymentEntity } from "./transaction-payment.entity.interface";
import { ITransactionPriceEntity } from "./transaction-price.entity.interface";

export interface ITransactionEntity
	extends IBaseEntity,
		Prisma.TransactionGetPayload<{
			select: (typeof PrismaSelector)["TRANSACTION"];
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
