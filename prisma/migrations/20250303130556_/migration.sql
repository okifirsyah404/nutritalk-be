/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `PatientDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "PatientDetail" DROP COLUMN "phoneNumber";
