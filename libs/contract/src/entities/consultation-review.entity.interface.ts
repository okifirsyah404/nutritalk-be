import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { ITransactionEntity } from "./transaction.entity.interface";

export interface IConsultationReviewEntity
	extends IBaseEntity,
		Prisma.ConsultationReviewGetPayload<{
			select: (typeof PrismaSelector)["CONSULTATION_REVIEW"];
		}> {
	transactionId?: string;
	transaction?: ITransactionEntity;
}
