-- DropForeignKey
ALTER TABLE "DeviceInfo" DROP CONSTRAINT "DeviceInfo_accountId_fkey";

-- DropForeignKey
ALTER TABLE "GoogleSSO" DROP CONSTRAINT "GoogleSSO_ssoId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_accountId_fkey";

-- DropForeignKey
ALTER TABLE "RolePermission" DROP CONSTRAINT "RolePermission_basePermissionId_fkey";

-- DropForeignKey
ALTER TABLE "RolePermission" DROP CONSTRAINT "RolePermission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "SingleSignOn" DROP CONSTRAINT "SingleSignOn_accountId_fkey";

-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AddForeignKey
ALTER TABLE "DeviceInfo" ADD CONSTRAINT "DeviceInfo_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_basePermissionId_fkey" FOREIGN KEY ("basePermissionId") REFERENCES "BasePermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SingleSignOn" ADD CONSTRAINT "SingleSignOn_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleSSO" ADD CONSTRAINT "GoogleSSO_ssoId_fkey" FOREIGN KEY ("ssoId") REFERENCES "SingleSignOn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
