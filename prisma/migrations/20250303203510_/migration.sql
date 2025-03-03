/*
  Warnings:

  - You are about to drop the column `bmi` on the `PatientDetail` table. All the data in the column will be lost.
  - You are about to drop the column `bmiStatus` on the `PatientDetail` table. All the data in the column will be lost.
  - You are about to drop the column `dietGoal` on the `PatientDetail` table. All the data in the column will be lost.
  - You are about to drop the column `dietPlan` on the `PatientDetail` table. All the data in the column will be lost.
  - You are about to drop the column `dietPlanDescription` on the `PatientDetail` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `PatientDetail` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `PatientDetail` table. All the data in the column will be lost.
  - You are about to drop the `MedicalRecord` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[anthropometricId]` on the table `PatientDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nutritionCarePlanId]` on the table `PatientDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_medicalRecordKeyId_fkey";

-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "PatientDetail" DROP COLUMN "bmi",
DROP COLUMN "bmiStatus",
DROP COLUMN "dietGoal",
DROP COLUMN "dietPlan",
DROP COLUMN "dietPlanDescription",
DROP COLUMN "height",
DROP COLUMN "weight",
ADD COLUMN     "anthropometricId" TEXT,
ADD COLUMN     "nutritionCarePlanId" TEXT;

-- DropTable
DROP TABLE "MedicalRecord";

-- CreateTable
CREATE TABLE "MedicalRecordHistory" (
    "id" TEXT NOT NULL,
    "diagnosis" TEXT,
    "notes" TEXT,
    "others" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "medicalRecordKeyId" TEXT,
    "anthropometricId" TEXT,
    "dietaryAssessmentId" TEXT,
    "gastrointestinalRecordId" TEXT,
    "consultationId" TEXT,

    CONSTRAINT "MedicalRecordHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anthropometric" (
    "id" TEXT NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "bmi" DOUBLE PRECISION,
    "bmiStatus" "BmiStatus",
    "fatPercentage" DOUBLE PRECISION,
    "muscleMass" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Anthropometric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietaryAssessment" (
    "id" TEXT NOT NULL,
    "usualDiet" TEXT,
    "caloricIntake" INTEGER,
    "proteinIntake" INTEGER,
    "carbohydrateIntake" INTEGER,
    "fatIntake" INTEGER,
    "fiberIntake" INTEGER,
    "waterIntake" INTEGER,
    "foodAllergies" TEXT,
    "supplements" TEXT,
    "foodPreferences" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DietaryAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GastrointestinalRecord" (
    "id" TEXT NOT NULL,
    "disability" TEXT,
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
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "GastrointestinalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionCarePlan" (
    "id" TEXT NOT NULL,
    "dietPlan" "DietPlan",
    "dietGoal" "DietGoal",
    "dietPlanDescription" TEXT,
    "exerciseGuidelines" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "NutritionCarePlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecordHistory_anthropometricId_key" ON "MedicalRecordHistory"("anthropometricId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecordHistory_dietaryAssessmentId_key" ON "MedicalRecordHistory"("dietaryAssessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecordHistory_gastrointestinalRecordId_key" ON "MedicalRecordHistory"("gastrointestinalRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecordHistory_consultationId_key" ON "MedicalRecordHistory"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientDetail_anthropometricId_key" ON "PatientDetail"("anthropometricId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientDetail_nutritionCarePlanId_key" ON "PatientDetail"("nutritionCarePlanId");

-- AddForeignKey
ALTER TABLE "PatientDetail" ADD CONSTRAINT "PatientDetail_anthropometricId_fkey" FOREIGN KEY ("anthropometricId") REFERENCES "Anthropometric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientDetail" ADD CONSTRAINT "PatientDetail_nutritionCarePlanId_fkey" FOREIGN KEY ("nutritionCarePlanId") REFERENCES "NutritionCarePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecordHistory" ADD CONSTRAINT "MedicalRecordHistory_medicalRecordKeyId_fkey" FOREIGN KEY ("medicalRecordKeyId") REFERENCES "MedicalRecordKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecordHistory" ADD CONSTRAINT "MedicalRecordHistory_anthropometricId_fkey" FOREIGN KEY ("anthropometricId") REFERENCES "Anthropometric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecordHistory" ADD CONSTRAINT "MedicalRecordHistory_dietaryAssessmentId_fkey" FOREIGN KEY ("dietaryAssessmentId") REFERENCES "DietaryAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecordHistory" ADD CONSTRAINT "MedicalRecordHistory_gastrointestinalRecordId_fkey" FOREIGN KEY ("gastrointestinalRecordId") REFERENCES "GastrointestinalRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecordHistory" ADD CONSTRAINT "MedicalRecordHistory_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
