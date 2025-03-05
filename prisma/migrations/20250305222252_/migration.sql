-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
