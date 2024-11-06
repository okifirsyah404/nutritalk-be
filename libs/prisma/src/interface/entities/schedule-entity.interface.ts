import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IBaseEntity } from './base/base-entity.interface';
import { INutritionistEntity } from './nutritionist-entity.interface';
import { IScheduleTimeEntity } from './schedule-time-entity.interface';

export interface IScheduleEntity
  extends IBaseEntity,
    Prisma.ScheduleGetPayload<{
      select: (typeof PrismaSelector)['SCHEDULE'];
    }> {
  nutritionistId?: string;
  nutritionist?: INutritionistEntity;
  scheduleTime?: IScheduleTimeEntity[];
}
