import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";
import { ISingleSignOnEntity } from "./single-sign-on.entity.interface";

export interface IAccountEntity
	extends IBaseEntity,
		Prisma.AccountGetPayload<{
			select: (typeof PrismaSelector)["ACCOUNT"];
		}> {
	password?: string;
	fcmToken?: string;
	refreshToken?: string;
	roleId?: string;
	patient?: IPatientEntity;
	nutritionist?: INutritionistEntity;
	sso?: ISingleSignOnEntity;
}
