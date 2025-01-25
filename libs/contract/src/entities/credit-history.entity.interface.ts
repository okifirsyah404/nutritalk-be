import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { ICreditEntity } from "./credit.entity.interface";

export interface ICreditHistoryEntity
	extends IBaseEntity,
		Prisma.CreditHistoryGetPayload<{
			select: (typeof PrismaSelector)["CREDIT_HISTORY"];
		}> {
	creditId?: string;
	credit?: ICreditEntity;
}
