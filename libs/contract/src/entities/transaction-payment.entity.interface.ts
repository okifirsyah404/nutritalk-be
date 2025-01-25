import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { ITransactionEntity } from "./transaction.entity.interface";

export interface ITransactionPaymentEntity
	extends IBaseEntity,
		Prisma.TransactionPaymentGetPayload<{
			select: (typeof PrismaSelector)["TRANSACTION_PAYMENT"];
		}> {
	transactionId?: string;
	transaction?: ITransactionEntity;
}
