import {
  IAccountEntity,
  INutritionistEntity,
  IProfileEntity,
} from '@database/prisma';
import { IConsultationMetaEntity } from '@database/prisma/interface/entities/consultation-meta-entity.interface';
import { Gender, NutritionistType, Role } from '@prisma/client';

export class ProfileResponse implements INutritionistEntity {
  id: string;
  type: NutritionistType;
  nip: string;
  nidn: string;
  isAvailable: boolean;
  account?: IAccountEntity;
  profile?: IProfileEntity;
  consultationMeta?: IConsultationMetaEntity;
  private constructor(data: INutritionistEntity) {
    this.id = data.id;
    this.nip = data.nip;
    this.nidn = data.nidn;
    this.type = data.type;
    this.isAvailable = data.isAvailable;
    this.account = data.account;
    this.profile = data.profile;
    this.consultationMeta = data.consultationMeta;
  }

  static fromEntity(data: INutritionistEntity): ProfileResponse {
    return new ProfileResponse(data);
  }

  static readonly exampleData: ProfileResponse = {
    id: 'cm32r86wi000b3vptrq0792sp',
    type: NutritionistType.COUNSELOR,
    nip: '202407252005022001',
    nidn: '0912458102',
    isAvailable: true,
    account: {
      id: 'cm32r86wi000b3vptrq0792sp',
      email: 'johndoe@example.com',
      role: Role.NUTRITIONIST,
      googleId: '1234567890',
    },
    profile: {
      id: 'cm32r86wi000b3vptrq0792sp',
      name: 'John Doe',
      phoneNumber: '081234567890',
      address: 'Jl. Jend. Sudirman No. 1',
      age: 25,
      dateOfBirth: new Date('1996-07-25'),
      gender: Gender.MALE,
      placeOfBirth: 'Jember',
      imageKey: 'profile-image.jpg',
    },
  };
}
