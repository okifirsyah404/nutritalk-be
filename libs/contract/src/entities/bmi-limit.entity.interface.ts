import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IBmiLimitEntity
	extends IBaseEntity,
		Prisma.BmiLimitGetPayload<{
			select: (typeof PrismaSelector)["BMI_LIMIT"];
		}> {}
