-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
