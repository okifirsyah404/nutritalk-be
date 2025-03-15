import { PatientCreateConsultationOrderRequest } from "@app/app/patient/order/dto/request/patient-create-consultation-order.request";
import { BaseApiResponse } from "@common";
import { AppConfigService } from "@config/app-config";
import { ConsultationSuccessMessage } from "@constant/message";
import {
	ICheckOrderScheduleOverlaps,
	ICreateConsultationOrderResponse,
	IPatientEntity,
} from "@contract";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import {
	Body,
	Controller,
	Get,
	Logger,
	Param,
	Post,
	Render,
	UseGuards,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientCheckOrderScheduleOverlapsRequest } from "../dto/request/patient-check-order-schedule-overlaps.request";
import { PatientOrderService } from "../service/patient-order.service";

// @UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "order"))
export class PatientOrderController {
	constructor(
		private readonly service: PatientOrderService,
		private readonly config: AppConfigService,
	) {}

	private readonly logger = new Logger(PatientOrderController.name);

	/**
	 * Http endpoint for checking order schedule overlaps.
	 * @param reqBody - The request body containing the order details.
	 * @returns The order details with updated schedule if there is an overlap.
	 */
	@UseGuards(AccessTokenGuard)
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

	@UseGuards(AccessTokenGuard)
	@Post("consultation")
	async createConsultationOrder(
		@GetPatientLogged() patient: IPatientEntity,
		@Body() reqBody: PatientCreateConsultationOrderRequest,
	): Promise<BaseApiResponse<ICreateConsultationOrderResponse>> {
		const result = await this.service.createConsultationOrder(patient, reqBody);

		return BaseApiResponse.created({
			message: ConsultationSuccessMessage.SUCCESS_CREATE_CONSULTATION_ORDER,
			data: result,
		});
	}

	@Get("snap/:token")
	@Render("snap")
	renderSnapView(@Param("token") token: string): {
		token: string;
		clientKey: string;
	} {
		const clientKey = this.config.midtransConfig.clientKey;

		this.logger.log(`Client Key: ${clientKey}`);
		this.logger.log(`Snap token: ${token}`);

		return { token, clientKey: clientKey };
	}
}
