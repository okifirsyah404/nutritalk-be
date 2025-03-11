import { Module } from "@nestjs/common";
import { MidtransNotificationController } from "./controller/midtrans-notification.controller";
import { MidtransNotificationService } from "./service/midtrans-notification.service";

@Module({
	controllers: [MidtransNotificationController],
	providers: [MidtransNotificationService],
})
export class MidtransNotificationModule {}
