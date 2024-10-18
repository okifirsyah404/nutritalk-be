import { BmiStatus } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';

export interface IBmiLimit extends IBaseEntity {
  status: BmiStatus;
  min: number;
  max: number;
}
