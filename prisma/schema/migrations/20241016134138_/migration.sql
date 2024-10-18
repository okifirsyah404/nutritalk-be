/*
  Warnings:

  - A unique constraint covering the columns `[signature]` on the table `Signature` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Signature_signature_key" ON "Signature"("signature");

-- CreateIndex
CREATE INDEX "Signature_signature_idx" ON "Signature"("signature");
