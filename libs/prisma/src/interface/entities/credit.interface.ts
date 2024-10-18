import { IBaseEntity } from './base/base.interface';
import { ICreditHistory } from './credit-history.interface';
import { IPatient } from './patient.interface';

export interface ICredit extends IBaseEntity {
  balance: number;
  creditHistory: ICreditHistory[];
  patient?: IPatient | null;
  patientId?: string | null;
}
