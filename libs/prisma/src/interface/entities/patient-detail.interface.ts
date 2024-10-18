import { BmiStatus, DietGoal, DietPlan, PatientActivity } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';

export interface IPatientDetail extends IBaseEntity {
  activityLevel?: PatientActivity | null;
  dailyCalories?: number | null;
  height?: number | null;
  weight?: number | null;
  dietPlan?: DietPlan | null;
  dietGoal?: DietGoal | null;
  dietPlanDesc?: string | null;
  bmi?: number | null;
  bmiStatus?: BmiStatus | null;
}
