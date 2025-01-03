import { AppConfigModule } from "@config/app-config";
import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
	imports: [AppConfigModule],
	controllers: [NotificationController],
	providers: [NotificationService],
})
export class NotificationModule {}
