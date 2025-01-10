import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IRolePermissionEntity } from "./role-permission.entity.interface";

export interface IBasePermissionEntity
	extends IBaseEntity,
		Prisma.BasePermissionGetPayload<{
			select: (typeof PrismaSelector)["BASE_PERMISSION"];
		}> {
	rolePermissions?: IRolePermissionEntity[];
}
