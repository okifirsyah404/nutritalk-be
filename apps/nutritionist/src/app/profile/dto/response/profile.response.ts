import { IAccount, INutritionist, IProfile } from '@database/prisma';
import { IConsultationMeta } from '@database/prisma/interface/entities/consultation-meta.interface';
import { IOccupation } from '@database/prisma/interface/entities/occupation.interface';
import { IPriceEntity } from '@database/prisma/interface/entities/price.interface';
import { IRegistrationCertificate } from '@database/prisma/interface/entities/registration-certificate.interface';
import { IScheduleEntity } from '@database/prisma/interface/entities/schedule.interface';
import { NutritionistType } from '@prisma/client';

export class ProfileResponse implements INutritionist {
  id: string;
  nip?: string;
  nidn?: string;
  accountId?: string;
  profileId?: string;
  type?: NutritionistType;
  account?: IAccount;
  profile?: IProfile;
  consultationMeta?: IConsultationMeta;
  occupation?: IOccupation;
  price?: IPriceEntity;
  registrationCertificate?: IRegistrationCertificate;
  schedules?: IScheduleEntity[];

  constructor(data: INutritionist) {
    this.id = data.id;
    this.nip = data.nip;
    this.nidn = data.nidn;
    this.accountId = data.accountId;
    this.profileId = data.profileId;
    this.type = data.type;
    this.account = data.account;
    this.profile = data.profile;
    this.consultationMeta = data.consultationMeta;
    this.occupation = data.occupation;
    this.price = data.price;
    this.registrationCertificate = data.registrationCertificate;
    this.schedules = data.schedules;
  }

  static fromEntity(data: INutritionist): ProfileResponse {
    return new ProfileResponse(data);
  }
}
