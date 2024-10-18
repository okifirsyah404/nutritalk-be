import { IBaseEntity } from './base/base.interface';
import { IScheduleEntity } from './schedule.interface';

export interface IScheduleTimeEntity extends IBaseEntity {
  start: Date;
  end: Date;
  active: boolean;

  scheduleId?: string | null;

  schedule?: IScheduleEntity | null;
}
