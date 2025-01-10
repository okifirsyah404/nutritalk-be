import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IWorkSpaceServiceEntity
	extends IBaseEntity,
		Prisma.WorkspaceServiceGetPayload<{
			select: (typeof PrismaSelector)["WORKSPACE_SERVICE"];
		}> {}
