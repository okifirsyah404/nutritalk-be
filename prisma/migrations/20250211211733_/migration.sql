-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "lastActivity" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
