import { IBaseEntity } from './base/base.interface';

export interface IWorkspaceService extends IBaseEntity {
  name: string;
  description: string;
  imageKey?: string | null;
}
