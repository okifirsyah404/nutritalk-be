import { NutritionistErrorMessage } from "@constant/message";
import {
	ICheckOrderScheduleOverlaps,
	ICreateConsultationOrderRequest,
	ICreateConsultationOrderResponse,
	IPatientEntity,
	MidtransGenerateSnapTokenResponse,
} from "@contract";
import { MidtransService } from "@module/midtrans";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConsultationType, PaymentSource } from "@prisma/client";
import { PatientOrderRepository } from "../repository/patient-order.repository";

@Injectable()
export class PatientOrderService {
	constructor(
		private readonly repository: PatientOrderRepository,
		private readonly midtransService: MidtransService,
	) {}

	private readonly logger = new Logger(PatientOrderService.name);

	/**
	 * Check if the order schedule overlaps with existing consultations.
	 * @param nutritionistId - The ID of the nutritionist.
	 * @param startDate - The start date of the consultation.
	 * @param endDate - The end date of the consultation.
	 * @returns True if there is an overlap, false otherwise.
	 */
	async checkOrderScheduleOverlaps(
		reqBody: ICheckOrderScheduleOverlaps,
	): Promise<ICheckOrderScheduleOverlaps> {
		const nutritionist = await this.repository.findNutritionistById(
			reqBody.nutritionistId,
		);

		if (!nutritionist) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_NUTRITIONIST_NOT_FOUND,
			);
		}

		// const result = await this.repository.getOverlapsConsultation(reqBody);

		// if (result) {
		// 	throw new UnprocessableEntityException(
		// 		ConsultationErrorMessage.ERR_ORDER_SCHEDULE_OVERLAPS,
		// 	);
		// }

		return reqBody;
	}

	/**
	 * Create a new consultation order.
	 * @param patient - The patient entity.
	 * @param reqBody - The request body containing the order details.
	 * @returns The created consultation order response.
	 */
	async createConsultationOrder(
		patient: IPatientEntity,
		reqBody: ICreateConsultationOrderRequest,
	): Promise<ICreateConsultationOrderResponse> {
		const nutritionist = await this.repository.findNutritionistById(
			reqBody.nutritionistId,
		);

		if (!nutritionist) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_NUTRITIONIST_NOT_FOUND,
			);
		}

		const totalPrice =
			reqBody.type === ConsultationType.ONLINE
				? this.countTotalPrice(nutritionist.price.online, reqBody.duration)
				: this.countTotalPrice(nutritionist.price.offline, reqBody.duration);

		const consultation = await this.repository.createConsultationOrder({
			...reqBody,
			patientId: patient.id,
			price: totalPrice,
			subTotal: totalPrice,
			total: totalPrice,
		});

		const midtransResult: MidtransGenerateSnapTokenResponse | undefined =
			reqBody.paymentSource === PaymentSource.MIDTRANS
				? await this.midtransService.generateSnapToken({
						transactionDetail: {
							trId: consultation.trId,
							consultationFee:
								reqBody.type === ConsultationType.ONLINE
									? nutritionist.price.online
									: nutritionist.price.offline,
							quantity: reqBody.duration,
							nutritionistId: nutritionist.id,
							nutritionistName: nutritionist.profile.name,
							grossAmount: totalPrice,
						},
						customerDetail: {
							name: patient.profile.name,
							email: patient.account.email,
							phone: patient.profile.phoneNumber,
						},
					})
				: undefined;

		if (midtransResult) {
			await this.repository.updateTransactionPayment({
				consultationId: consultation.id,
				midtransSnapToken: midtransResult?.token,
				midtransRedirectUrl: midtransResult?.redirectUrl,
			});
		}

		return {
			consultation,
			midtransSnapToken: midtransResult?.token ?? null,
			midtransRedirectUrl: midtransResult?.redirectUrl ?? null,
		};
	}

	/** Count the total price of the consultation.
	 *
	 * @param price - The price of the consultation.
	 * @param duration - The duration of the consultation.
	 *
	 * @returns The total price of the consultation.
	 * */
	private countTotalPrice(price: number, duration: number): number {
		return price * (duration / 60);
	}
}
