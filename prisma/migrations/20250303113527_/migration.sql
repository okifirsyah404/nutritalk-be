/*
  Warnings:

  - You are about to drop the column `name` on the `MedicalRecordKey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "MedicalRecordKey" DROP COLUMN "name";
