/*
  Warnings:

  - You are about to drop the column `source` on the `TransactionPrice` table. All the data in the column will be lost.
  - You are about to drop the `Access` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[refreshToken]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_accountId_fkey";

-- AlterTable
ALTER TABLE "TransactionPrice" DROP COLUMN "source",
ADD COLUMN     "sources" "PaymentSource"[];

-- DropTable
DROP TABLE "Access";

-- CreateIndex
CREATE UNIQUE INDEX "Account_refreshToken_key" ON "Account"("refreshToken");
