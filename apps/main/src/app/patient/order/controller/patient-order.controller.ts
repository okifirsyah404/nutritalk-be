import { BaseApiResponse } from "@common";
import { ConsultationSuccessMessage } from "@constant/message";
import { ICheckOrderScheduleOverlaps } from "@contract";
import { AccessTokenGuard } from "@module/app-jwt";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientCheckOrderScheduleOverlapsRequest } from "../dto/request/patient-check-order-schedule-overlaps.request";
import { PatientOrderService } from "../service/patient-order.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "order"))
export class PatientOrderController {
	constructor(private readonly service: PatientOrderService) {}

	/**
	 * Http endpoint for checking order schedule overlaps.
	 * @param reqBody - The request body containing the order details.
	 * @returns The order details with updated schedule if there is an overlap.
	 */
	@Post("check-schedule")
	async checkOrderScheduleOverlaps(
		@Body() reqBody: PatientCheckOrderScheduleOverlapsRequest,
	): Promise<BaseApiResponse<ICheckOrderScheduleOverlaps>> {
		const result = await this.service.checkOrderScheduleOverlaps(reqBody);

		return BaseApiResponse.created({
			message: ConsultationSuccessMessage.SUCCESS_CHECK_ORDER_SCHEDULE_OVERLAPS,
			data: result,
		});
	}
}
