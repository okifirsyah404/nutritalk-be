import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { ITransactionEntity } from "./transaction.entity.interface";

export interface ITransactionPriceEntity
	extends IBaseEntity,
		Prisma.TransactionPriceGetPayload<{
			select: (typeof PrismaSelector)["TRANSACTION_PRICE"];
		}> {
	transactionId?: string;
	transaction?: ITransactionEntity;
}
