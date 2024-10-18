import { IBaseEntity } from './base/base.interface';
import { ITransaction } from './transaction.interface';

export interface IConsultationTime extends IBaseEntity {
  start: Date;
  end: Date;
  transactionId?: string | null;
  transaction?: ITransaction | null;
}
