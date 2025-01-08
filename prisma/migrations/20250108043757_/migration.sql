/*
  Warnings:

  - You are about to drop the column `role` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role",
ADD COLUMN     "roleId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- CreateTable
CREATE TABLE "BasePermission" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BasePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "accountId" TEXT,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "isPermitted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "roleId" TEXT,
    "basePermissionId" TEXT,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BasePermission_key_key" ON "BasePermission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_accountId_key" ON "Roles"("accountId");

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_basePermissionId_fkey" FOREIGN KEY ("basePermissionId") REFERENCES "BasePermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
