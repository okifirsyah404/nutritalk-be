-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "Credit" ALTER COLUMN "balance" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Occupation" ALTER COLUMN "experience" DROP NOT NULL;
