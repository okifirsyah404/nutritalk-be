-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "MedicalRecordKey" ALTER COLUMN "code" SET DEFAULT generate_rm_index();
