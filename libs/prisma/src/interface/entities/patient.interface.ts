import { IAccount, IAccountWithoutPassword } from './account.interface';
import { IBaseEntity } from './base/base.interface';
import { ICredit } from './credit.interface';
import { IMedicalRecordKey } from './medical-record-key.interface';
import { IProfile } from './profile.interface';
import { ITransaction } from './transaction.interface';

export interface IPatient extends IBaseEntity {
  accountId?: string | null;
  profileId?: string | null;
  medicalRecordKeyId?: string | null;

  account?: IAccount | IAccountWithoutPassword | null;
  profile?: IProfile | null;
  credit?: ICredit | null;
  medicalRecordKey?: IMedicalRecordKey | null;
  transactions?: ITransaction[] | null;
}
