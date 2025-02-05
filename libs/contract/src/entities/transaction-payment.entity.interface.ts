import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationEntity } from "./consultation.entity.interface";

export interface ITransactionPaymentEntity
	extends IBaseEntity,
		Prisma.TransactionPaymentGetPayload<{
			select: (typeof PrismaSelector)["TRANSACTION_PAYMENT"];
		}> {
	consultationId?: string;
	transaction?: IConsultationEntity;
}
