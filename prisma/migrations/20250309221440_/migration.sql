-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "ConsultationReview" ADD COLUMN     "isAnonymous" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "NutritionistSystemSetting" (
    "id" TEXT NOT NULL,
    "isAutoAvailable" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "nutritionistId" TEXT,

    CONSTRAINT "NutritionistSystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionistSystemSetting_nutritionistId_key" ON "NutritionistSystemSetting"("nutritionistId");

-- AddForeignKey
ALTER TABLE "NutritionistSystemSetting" ADD CONSTRAINT "NutritionistSystemSetting_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
