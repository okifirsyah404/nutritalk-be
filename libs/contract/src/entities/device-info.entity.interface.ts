import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IAccountEntity } from "./account.entity.interface";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IDeviceInfoEntity
	extends IBaseEntity,
		Prisma.DeviceInfoGetPayload<{
			select: (typeof PrismaSelector)["DEVICE_INFO"];
		}> {
	accountId?: string;
	account?: IAccountEntity;
}
