-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "TransactionPrice" ALTER COLUMN "credit" DROP NOT NULL;
