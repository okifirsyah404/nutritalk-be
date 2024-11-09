import { INutritionistEntity, ITransactionEntity } from '@database/prisma';
import {
  ConsultationType,
  Gender,
  NutritionistType,
  TransactionStatus,
} from '@prisma/client';

export class DashboardResponse {
  nutritionist: INutritionistEntity;
  countScheduledConsultation: number;
  scheduledConsultations: ITransactionEntity[];
  countPendingConsultation: number;
  pendingConsultations: ITransactionEntity[];

  private constructor(data: {
    nutritionist: INutritionistEntity;
    countScheduledConsultation: number;
    scheduledConsultations: ITransactionEntity[];
    countPendingConsultation: number;
    pendingConsultations: ITransactionEntity[];
  }) {
    this.nutritionist = data.nutritionist;
    this.countScheduledConsultation = data.countScheduledConsultation;
    this.scheduledConsultations = data.scheduledConsultations;
    this.countPendingConsultation = data.countPendingConsultation;
    this.pendingConsultations = data.pendingConsultations;
  }

  static fromData(data: {
    nutritionist: INutritionistEntity;
    countScheduledConsultation: number;
    scheduledConsultations: ITransactionEntity[];
    countPendingConsultation: number;
    pendingConsultations: ITransactionEntity[];
  }): DashboardResponse {
    return new DashboardResponse(data);
  }

  static readonly exampleData: DashboardResponse = {
    nutritionist: {
      id: 'cm32r86wi000b3vptrq0792sp',
      type: NutritionistType.COUNSELOR,
      nip: '202407252005022001',
      nidn: '0912458102',
      isAvailable: true,
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
      consultationMeta: {
        id: 'cm32r86wi000b3vptrq0792sp',
        successConsultation: 100,
        avgRating: 4.5,
        consultation: 110,
      },
    },
    countScheduledConsultation: 1,
    scheduledConsultations: [
      {
        id: 'cm36xgm8c009iati4e32pr56e',
        status: TransactionStatus.SCHEDULED,
        type: ConsultationType.ONLINE,
        note: 'Tribuo accedo verus excepturi saepe labore.',
        consultationTime: {
          id: 'cm36xgm8c009jati469pp1axg',
          start: new Date(),
          end: new Date(),
        },
      },
    ],
    countPendingConsultation: 1,
    pendingConsultations: [
      {
        id: 'cm36xgm8c009iati4e32pr56e',
        status: TransactionStatus.WAITING_CONFIRMATION,
        type: ConsultationType.ONLINE,
        note: 'Tribuo accedo verus excepturi saepe labore.',
        consultationTime: {
          id: 'cm36xgm8c009jati469pp1axg',
          start: new Date(),
          end: new Date(),
        },
      },
    ],
  };
}
