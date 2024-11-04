import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IMedicalRecord } from './medical-record-entity.interface';
import { IPatientDetail } from './patient-detail-entity.interface';
import { IPatientEntity } from './patient-entity.interface';

export interface IMedicalRecordKeyEntity
  extends Prisma.MedicalRecordKeyGetPayload<{
    select: (typeof PrismaSelector)['MEDICAL_RECORD_KEY'];
  }> {
  patient?: IPatientEntity;
  patientDetail?: IPatientDetail;
  medicalRecords?: IMedicalRecord[];
}
