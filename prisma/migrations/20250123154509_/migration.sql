/*
  Warnings:

  - A unique constraint covering the columns `[nutritionistId,dayOfWeek]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_nutritionistId_dayOfWeek_key" ON "Schedule"("nutritionistId", "dayOfWeek");
