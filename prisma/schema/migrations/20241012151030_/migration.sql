/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Access` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Access_accountId_key" ON "Access"("accountId");
