-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" DROP NOT NULL,
ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
