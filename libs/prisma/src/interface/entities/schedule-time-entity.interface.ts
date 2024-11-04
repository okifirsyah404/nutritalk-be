import { IScheduleEntity } from './schedule-entity.interface';

export interface IScheduleTimeEntity {
  start: Date;
  end: Date;
  active: boolean;

  scheduleId?: string | null;

  schedule?: IScheduleEntity | null;
}
