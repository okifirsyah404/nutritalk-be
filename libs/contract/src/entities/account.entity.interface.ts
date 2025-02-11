import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IDeviceInfoEntity } from "./device-info.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";
import { ISingleSignOnEntity } from "./single-sign-on.entity.interface";

export interface IAccountEntity
	extends IBaseEntity,
		Prisma.AccountGetPayload<{
			select: (typeof PrismaSelector)["ACCOUNT"];
		}> {
	password?: string;
	refreshToken?: string;
	roleId?: string;
	lastActivity?: Date;
	patient?: IPatientEntity;
	nutritionist?: INutritionistEntity;
	sso?: ISingleSignOnEntity;
	deviceInfo?: IDeviceInfoEntity;
}
