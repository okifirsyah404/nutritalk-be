import { IBaseEntity } from './base/base.interface';
import { INutritionist } from './nutritionist.interface';

export interface IConsultationMeta extends IBaseEntity {
  avgRating?: number | null;
  consultation?: number | null;
  successConsultation?: number | null;

  nutritionistId?: string | null;

  nutritionist?: INutritionist | null;
}
