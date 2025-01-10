import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IScheduleEntity } from "./schedule.entity.interface";

export interface IScheduleTimeEntity
	extends IBaseEntity,
		Prisma.ScheduleTimeGetPayload<{
			select: (typeof PrismaSelector)["SCHEDULE_TIME"];
		}> {
	scheduleId?: string;
	schedule?: IScheduleEntity;
}
