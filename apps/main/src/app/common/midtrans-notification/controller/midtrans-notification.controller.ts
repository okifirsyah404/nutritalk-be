import { Controller, Get, Param, Render } from "@nestjs/common";
import { MidtransNotificationService } from "../service/midtrans-notification.service";

@Controller("midtrans-notification")
export class MidtransNotificationController {
	constructor(private readonly service: MidtransNotificationService) {}

	@Get("finish")
	@Render("midtrans-redirect")
	finishNotification(@Param("token") token: string): { token: string } {
		return { token };
	}

	@Get("pending")
	@Render("midtrans-redirect")
	pendingNotification(@Param("token") token: string): { token: string } {
		return { token };
	}

	@Get("error")
	@Render("midtrans-redirect")
	errorNotification(@Param("token") token: string): { token: string } {
		return { token };
	}
}
