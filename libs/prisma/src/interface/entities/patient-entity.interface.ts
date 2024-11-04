import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IAccountEntity } from './account-entity.interface';
import { IBaseEntity } from './base/base-entity.interface';
import { ICredit } from './credit-entity.interface';
import { IMedicalRecordKeyEntity } from './medical-record-key-entity.interface';
import { IProfileEntity } from './profile-entity.interface';
import { ITransactionEntity } from './transaction-entity.interface';

export interface IPatientEntity
  extends IBaseEntity,
    Prisma.PatientGetPayload<{
      select: (typeof PrismaSelector)['PATIENT'];
    }> {
  accountId?: string;
  profileId?: string;
  medicalRecordKeyId?: string;
  account?: IAccountEntity;
  profile?: IProfileEntity;
  credit?: ICredit;
  medicalRecordKey?: IMedicalRecordKeyEntity;
  transactions?: ITransactionEntity[];
}
