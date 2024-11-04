-- AlterTable
ALTER TABLE "Nutritionist" ADD COLUMN     "isAvailable" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');
