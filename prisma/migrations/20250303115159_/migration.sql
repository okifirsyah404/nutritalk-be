/*
  Warnings:

  - You are about to drop the column `note` on the `Consultation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "note",
ADD COLUMN     "nutritionistNote" TEXT,
ADD COLUMN     "patientNote" TEXT,
ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
