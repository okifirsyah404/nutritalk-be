import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { ISingleSignOnEntity } from "./single-sign-on.entity.interface";

export interface IGoogleSsoEntity
	extends IBaseEntity,
		Prisma.GoogleSSOGetPayload<{
			select: (typeof PrismaSelector)["GOOGLE_SSO"];
		}> {
	ssoId?: string;
	sso?: ISingleSignOnEntity;
}
