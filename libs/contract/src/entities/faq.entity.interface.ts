import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IFaqEntity
	extends IBaseEntity,
		Prisma.FaqGetPayload<{
			select: (typeof PrismaSelector)["FAQ"];
		}> {}
