import { PaymentSource } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';
import { ITransaction } from './transaction.interface';

export interface ITransactionPrice extends IBaseEntity {
  source?: PaymentSource[] | null;
  price: number;
  subTotal: number;
  credit: number;
  total: number;
  transactionId?: string | null;
  transaction?: ITransaction | null;
}
