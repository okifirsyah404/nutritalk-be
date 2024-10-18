import { BmiStatus } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';
import { IMedicalRecordKey } from './medical-record-key.interface';

export interface IMedicalRecord extends IBaseEntity {
  height?: number | null;
  weight?: number | null;
  bmi?: number | null;
  bmiStatus?: BmiStatus | null;
  disaability?: string | null;
  diagnosis?: string | null;
  allergies?: string | null;
  foodPreferences?: string | null;
  foodAvoidances?: string | null;
  appetite?: string | null;
  diarrhea?: boolean | null;
  constipation?: boolean | null;
  vomit?: boolean | null;
  nausea?: boolean | null;
  bloating?: boolean | null;
  swallowingDisorder?: boolean | null;
  chewingDisorder?: boolean | null;
  suckingDisorder?: boolean | null;
  notes?: string | null;
  others?: string | null;
  medicalRecordKeyId?: string | null;
  medicalRecordKey?: IMedicalRecordKey | null;
}
