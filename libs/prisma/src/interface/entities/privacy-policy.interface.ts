import { IBaseEntity } from './base/base.interface';

export interface IPrivacyPolicy extends IBaseEntity {
  title: string;
  content: string;
}
