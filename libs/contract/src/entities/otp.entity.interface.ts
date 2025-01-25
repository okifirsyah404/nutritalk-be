import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IOtpEntity
	extends IBaseEntity,
		Prisma.OtpGetPayload<{
			select: (typeof PrismaSelector)["OTP"];
		}> {}
