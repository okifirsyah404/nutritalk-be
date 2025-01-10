import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
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
