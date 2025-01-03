import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base-entity.interface";
import { INutritionistEntity } from "./nutritionist-entity.interface";

export interface IPriceEntity
	extends IBaseEntity,
		Prisma.PriceGetPayload<{
			select: (typeof PrismaSelector)["PRICE"];
		}> {
	nutritionist?: INutritionistEntity;
	nutritionistId?: string;
}
