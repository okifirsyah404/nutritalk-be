-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bio" TEXT;
