import { Module } from "@nestjs/common";
import { PermissionService } from "./provider/permission.service";

@Module({
	providers: [PermissionService],
	exports: [PermissionService],
})
export class PermissionModule {}
