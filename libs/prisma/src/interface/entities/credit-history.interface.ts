import { CreditAction } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';
import { ICredit } from './credit.interface';

export interface ICreditHistory extends IBaseEntity {
  action: CreditAction;
  amount: number;
  note?: string | null;
  creditId?: string | null;
  credit?: ICredit | null;
}
