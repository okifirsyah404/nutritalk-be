import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IAccountEntity } from "./account.entity.interface";
import { IBaseEntity } from "./base/base.entity.interface";

export interface ISingleSignOnEntity
	extends IBaseEntity,
		Prisma.SingleSignOnGetPayload<{
			select: (typeof PrismaSelector)["SINGLE_SIGN_ON"];
		}> {
	accountId?: string;
	account?: IAccountEntity;
}
