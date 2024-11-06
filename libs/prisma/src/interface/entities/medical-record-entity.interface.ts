import { Prisma } from '@prisma/client';
import { IMedicalRecordKeyEntity } from './medical-record-key-entity.interface';

export interface IMedicalRecord extends Prisma.MedicalRecordGetPayload<{}> {
  medicalRecordKey?: IMedicalRecordKeyEntity | null;
}
