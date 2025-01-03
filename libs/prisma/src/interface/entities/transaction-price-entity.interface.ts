import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base-entity.interface";
import { ITransactionEntity } from "./transaction-entity.interface";

export interface ITransactionPrice
	extends IBaseEntity,
		Prisma.TransactionPriceGetPayload<{
			select: (typeof PrismaSelector)["TRANSACTION_PRICE"];
		}> {
	transaction?: ITransactionEntity;
	transactionId?: string;
}
