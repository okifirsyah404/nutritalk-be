import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base-entity.interface";
import { ITransactionEntity } from "./transaction-entity.interface";

export interface ITransactionPayment
	extends IBaseEntity,
		Prisma.TransactionPaymentGetPayload<{
			select: (typeof PrismaSelector)["TRANSACTION_PAYMENT"];
		}> {
	transaction?: ITransactionEntity;
	transactionId?: string;
}
