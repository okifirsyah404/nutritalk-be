/*
  Warnings:

  - You are about to drop the column `googleId` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_googleId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "googleId";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- CreateTable
CREATE TABLE "SingleSignOn" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "accountId" TEXT,

    CONSTRAINT "SingleSignOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoogleSSO" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ssoId" TEXT,

    CONSTRAINT "GoogleSSO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SingleSignOn_accountId_key" ON "SingleSignOn"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleSSO_googleId_key" ON "GoogleSSO"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleSSO_email_key" ON "GoogleSSO"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleSSO_ssoId_key" ON "GoogleSSO"("ssoId");

-- AddForeignKey
ALTER TABLE "SingleSignOn" ADD CONSTRAINT "SingleSignOn_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleSSO" ADD CONSTRAINT "GoogleSSO_ssoId_fkey" FOREIGN KEY ("ssoId") REFERENCES "SingleSignOn"("id") ON DELETE SET NULL ON UPDATE CASCADE;
