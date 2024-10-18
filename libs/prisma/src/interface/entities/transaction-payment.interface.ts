import { IBaseEntity } from './base/base.interface';
import { ITransaction } from './transaction.interface';

export interface ITransactionPayment extends IBaseEntity {
  method?: string | null;
  code?: string | null;
  status?: string | null;
  date?: Date | null;
  transactionId?: string | null;
  transaction?: ITransaction | null;
}
