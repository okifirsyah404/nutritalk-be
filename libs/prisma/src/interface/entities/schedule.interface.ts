import { DayOfWeek } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';
import { INutritionist } from './nutritionist.interface';
import { IScheduleTimeEntity } from './schedule-time.interface';

export interface IScheduleEntity extends IBaseEntity {
  dayOfWeek: DayOfWeek;
  dayOfWeekIndex: number;
  active: boolean;

  nutritionistId?: string | null;

  nutritionist?: INutritionist | null;
  scheduleTime?: IScheduleTimeEntity[] | null;
}
