-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'CANCELED_PAYMENT';

-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
