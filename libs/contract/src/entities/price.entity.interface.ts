import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";

export interface IPriceEntity
	extends IBaseEntity,
		Prisma.PriceGetPayload<{
			select: (typeof PrismaSelector)["PRICE"];
		}> {
	nutritionistId?: string;
	nutritionist?: INutritionistEntity;
}
