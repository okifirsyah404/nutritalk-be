import { Prisma } from '@prisma/client';

export default abstract class PrismaSelector {
  static account = {
    id: true,
    email: true,
    role: true,
    googleId: true,
  } satisfies Prisma.AccountSelect;

  static profile = {
    id: true,
    name: true,
    phoneNumber: true,
    gender: true,
    placeOfBirth: true,
    dateOfBirth: true,
    age: true,
    imageKey: true,
    address: true,
  } satisfies Prisma.ProfileSelect;

  static patient = {
    id: true,
    profile: {
      select: PrismaSelector.profile,
    },
  } satisfies Prisma.PatientSelect;

  static nutritionistOccupation = {
    id: true,
    name: true,
    workPlace: true,
    experience: true,
  } satisfies Prisma.OccupationSelect;

  static registrationCertificate = {
    id: true,
    registrationNumber: true,
    issueDate: true,
    validUntil: true,
  } satisfies Prisma.RegistrationCertificateSelect;

  static price = {
    id: true,
    online: true,
    offline: true,
  } satisfies Prisma.PriceSelect;

  static schedule = {
    id: true,
    dayOfWeek: true,
    dayOfWeekIndex: true,
    active: true,
  } satisfies Prisma.ScheduleSelect;

  static scheduleTime = {
    id: true,
    start: true,
    end: true,
    active: true,
  } satisfies Prisma.ScheduleTimeSelect;

  static nutritionist = {
    id: true,
    nidn: true,
    nip: true,
    type: true,
    profile: {
      select: PrismaSelector.profile,
    },
  } satisfies Prisma.NutritionistSelect;

  static transactionMeta = {
    id: true,
    avgRating: true,
    successConsultation: true,
    consultation: true,
  } satisfies Prisma.ConsultationMetaSelect;

  static privacyPolicy = {
    id: true,
    title: true,
    content: true,
  } satisfies Prisma.PrivacyPolicySelect;

  static otp = {
    id: true,
    email: true,
    code: true,
    expired: true,
  } satisfies Prisma.OtpSelect;
}
