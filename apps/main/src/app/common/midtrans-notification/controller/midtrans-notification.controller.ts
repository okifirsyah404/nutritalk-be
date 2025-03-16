import { MidtransNotificationRequest } from "@app/app/common/midtrans-notification/dto/request/midtrans-notification.request";
import { BaseApiResponse } from "@common";
import { Body, Controller, Get, Param, Post, Render } from "@nestjs/common";
import { MidtransNotificationService } from "../service/midtrans-notification.service";

@Controller("midtrans-notification")
export class MidtransNotificationController {
	constructor(private readonly service: MidtransNotificationService) {}

	@Post()
	async onMidtransNotification(
		@Body() reqBody: MidtransNotificationRequest,
	): Promise<BaseApiResponse<MidtransNotificationRequest>> {
		const result = await this.service.onMidtransNotification(reqBody);

		return BaseApiResponse.created({
			message: "Midtrans notification received",
			data: result,
		});
	}

	@Get("finish")
	@Render("finish-payment")
	finishNotification(@Param("token") token: string): { token: string } {
		return { token };
	}

	@Get("unfinish")
	@Render("unfinish-payment")
	pendingNotification(@Param("token") token: string): { token: string } {
		return { token };
	}

	@Get("error")
	@Render("error-payment")
	errorNotification(@Param("token") token: string): { token: string } {
		return { token };
	}
}
