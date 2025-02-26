-- AlterEnum
ALTER TYPE "OtpPurpose" ADD VALUE 'AUTH_REGISTER';

-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
