import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";

export interface IProfileEntity
	extends IBaseEntity,
		Prisma.ProfileGetPayload<{
			select: (typeof PrismaSelector)["PROFILE"];
		}> {
	patient?: IPatientEntity;
	nutritionist?: INutritionistEntity;
}
