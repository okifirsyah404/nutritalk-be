import { IBaseEntity } from './base/base.interface';
import { IMedicalRecord } from './medical-record.interface';
import { IPatientDetail } from './patient-detail.interface';
import { IPatient } from './patient.interface';

export interface IMedicalRecordKey extends IBaseEntity {
  code: string;
  name: string;
  patient?: IPatient | null;
  patientDetail?: IPatientDetail | null;
  medicalRecords?: IMedicalRecord[] | null;
}
