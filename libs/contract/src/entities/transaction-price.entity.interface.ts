import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationEntity } from "./transaction.entity.interface";

export interface ITransactionPriceEntity
	extends IBaseEntity,
		Prisma.TransactionPriceGetPayload<{
			select: (typeof PrismaSelector)["TRANSACTION_PRICE"];
		}> {
	consultationId?: string;
	transaction?: IConsultationEntity;
}
