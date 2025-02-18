import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";

export interface IOccupationEntity
	extends IBaseEntity,
		Prisma.OccupationGetPayload<{
			select: (typeof PrismaSelector)["OCCUPATION"];
		}> {
	nutritionistId?: string;
	nutritionist?: INutritionistEntity;
}
