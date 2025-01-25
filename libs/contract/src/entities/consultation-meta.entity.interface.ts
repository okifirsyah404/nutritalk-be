import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";

export interface IConsultationMetaEntity
	extends IBaseEntity,
		Prisma.ConsultationMetaGetPayload<{
			select: (typeof PrismaSelector)["CONSULTATION_META"];
		}> {
	nutritionistId?: string;
	nutritionist?: INutritionistEntity;
}
