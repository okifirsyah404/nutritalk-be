import { Module } from "@nestjs/common";
import { MidtransNotificationController } from "./controller/midtrans-notification.controller";
import { MidtransNotificationService } from "./service/midtrans-notification.service";
import { MidtransNotificationRepository } from "@app/app/common/midtrans-notification/repository/midtrans-notification.repository";

@Module({
	controllers: [MidtransNotificationController],
	providers: [MidtransNotificationService, MidtransNotificationRepository],
})
export class MidtransNotificationModule {}
