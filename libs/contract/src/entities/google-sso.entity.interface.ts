import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { ISingleSignOnEntity } from "./single-sign-on.entity.interface";

export interface IGoogleSSOEntity
	extends IBaseEntity,
		Prisma.GoogleSSOGetPayload<{
			select: (typeof PrismaSelector)["GOOGLE_SSO"];
		}> {
	ssoId?: string;
	sso?: ISingleSignOnEntity;
}
