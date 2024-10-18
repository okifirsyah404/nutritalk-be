-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PATIENT', 'NUTRITIONIST');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ConsultationType" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('WAITING_PAYMENT', 'WAITING_CONFIRMATION', 'SCHEDULED', 'ON_PROCESS', 'FINISHED', 'RE_SCHEDULED', 'CANCELED');

-- CreateEnum
CREATE TYPE "OtpPurpose" AS ENUM ('AUTH', 'ACCOUNT');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "CreditAction" AS ENUM ('TOPUP', 'PAY_CONSULTATION', 'REFUND');

-- CreateEnum
CREATE TYPE "PatientActivity" AS ENUM ('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE', 'SUPER_ACTIVE');

-- CreateEnum
CREATE TYPE "DietPlan" AS ENUM ('WEIGHT_LOSS', 'WEIGHT_GAIN', 'MAINTAIN');

-- CreateEnum
CREATE TYPE "DietGoal" AS ENUM ('FAT_LOSS', 'MUSCLE_GAIN', 'MAINTAIN');

-- CreateEnum
CREATE TYPE "BmiStatus" AS ENUM ('UNDERWEIGHT', 'NORMAL', 'OVERWEIGHT', 'OBESE', 'OBESE_II', 'OBESE_III');

-- CreateEnum
CREATE TYPE "NutritionistType" AS ENUM ('COUNSELOR', 'EXPERT');

-- CreateEnum
CREATE TYPE "PaymentSource" AS ENUM ('CREDIT', 'MIDTRANS');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "googleId" TEXT,
    "fcmToken" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "placeOfBirth" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "age" INTEGER,
    "imageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT,
    "profileId" TEXT,
    "medicalRecordKeyId" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditHistory" (
    "id" TEXT NOT NULL,
    "action" "CreditAction" NOT NULL,
    "amount" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creditId" TEXT,

    CONSTRAINT "CreditHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecordKey" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalRecordKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientDetail" (
    "id" TEXT NOT NULL,
    "activityLevel" "PatientActivity",
    "dailyCalories" INTEGER,
    "height" INTEGER,
    "weight" INTEGER,
    "dietPlan" "DietPlan",
    "dietGoal" "DietGoal",
    "dietPlanDesc" TEXT,
    "bmi" DOUBLE PRECISION,
    "bmiStatus" "BmiStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "medicalRecordKeyId" TEXT,

    CONSTRAINT "PatientDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "bmi" DOUBLE PRECISION,
    "bmiStatus" "BmiStatus",
    "disability" TEXT,
    "diagnosis" TEXT,
    "allergies" TEXT,
    "foodPreferences" TEXT,
    "foodAvoidances" TEXT,
    "appetite" TEXT,
    "diarrhea" BOOLEAN,
    "constipation" BOOLEAN,
    "vomit" BOOLEAN,
    "nausea" BOOLEAN,
    "bloating" BOOLEAN,
    "swallowingDisorder" BOOLEAN,
    "chewingDisorder" BOOLEAN,
    "suckingDisorder" BOOLEAN,
    "notes" TEXT,
    "others" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "medicalRecordKeyId" TEXT,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nutritionist" (
    "id" TEXT NOT NULL,
    "type" "NutritionistType",
    "nip" TEXT,
    "nidn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT,
    "profileId" TEXT,

    CONSTRAINT "Nutritionist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationMeta" (
    "id" TEXT NOT NULL,
    "avgRating" DOUBLE PRECISION,
    "consultation" INTEGER,
    "successConsultation" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nutritionistId" TEXT,

    CONSTRAINT "ConsultationMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationCertificate" (
    "id" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nutritionistId" TEXT,

    CONSTRAINT "RegistrationCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Konselor Gizi',
    "workPlace" TEXT NOT NULL DEFAULT 'TEFA NCC Polije',
    "experience" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nutritionistId" TEXT,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "online" INTEGER NOT NULL,
    "offline" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nutritionistId" TEXT,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "dayOfWeekIndex" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nutritionistId" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleTime" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scheduleId" TEXT,

    CONSTRAINT "ScheduleTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "type" "ConsultationType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT,
    "nutritionistId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationTime" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "ConsultationTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionPrice" (
    "id" TEXT NOT NULL,
    "source" "PaymentSource"[],
    "price" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "TransactionPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionPayment" (
    "id" TEXT NOT NULL,
    "method" TEXT,
    "code" TEXT,
    "status" TEXT,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "TransactionPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationReview" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "ConsultationReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "purpose" "OtpPurpose" NOT NULL,
    "expired" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BmiLimit" (
    "id" TEXT NOT NULL,
    "status" "BmiStatus" NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BmiLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacyPolicy" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivacyPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_googleId_key" ON "Account"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_apiKey_key" ON "Admin"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_accountId_key" ON "Patient"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_profileId_key" ON "Patient"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_medicalRecordKeyId_key" ON "Patient"("medicalRecordKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_patientId_key" ON "Credit"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecordKey_code_key" ON "MedicalRecordKey"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PatientDetail_medicalRecordKeyId_key" ON "PatientDetail"("medicalRecordKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "Nutritionist_accountId_key" ON "Nutritionist"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Nutritionist_profileId_key" ON "Nutritionist"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationMeta_nutritionistId_key" ON "ConsultationMeta"("nutritionistId");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationCertificate_registrationNumber_key" ON "RegistrationCertificate"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationCertificate_nutritionistId_key" ON "RegistrationCertificate"("nutritionistId");

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_nutritionistId_key" ON "Occupation"("nutritionistId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_nutritionistId_key" ON "Price"("nutritionistId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationTime_transactionId_key" ON "ConsultationTime"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionPrice_transactionId_key" ON "TransactionPrice"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionPayment_transactionId_key" ON "TransactionPayment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationReview_transactionId_key" ON "ConsultationReview"("transactionId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medicalRecordKeyId_fkey" FOREIGN KEY ("medicalRecordKeyId") REFERENCES "MedicalRecordKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditHistory" ADD CONSTRAINT "CreditHistory_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientDetail" ADD CONSTRAINT "PatientDetail_medicalRecordKeyId_fkey" FOREIGN KEY ("medicalRecordKeyId") REFERENCES "MedicalRecordKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_medicalRecordKeyId_fkey" FOREIGN KEY ("medicalRecordKeyId") REFERENCES "MedicalRecordKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutritionist" ADD CONSTRAINT "Nutritionist_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutritionist" ADD CONSTRAINT "Nutritionist_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationMeta" ADD CONSTRAINT "ConsultationMeta_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationCertificate" ADD CONSTRAINT "RegistrationCertificate_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occupation" ADD CONSTRAINT "Occupation_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleTime" ADD CONSTRAINT "ScheduleTime_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationTime" ADD CONSTRAINT "ConsultationTime_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPrice" ADD CONSTRAINT "TransactionPrice_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPayment" ADD CONSTRAINT "TransactionPayment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationReview" ADD CONSTRAINT "ConsultationReview_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
