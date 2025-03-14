import { ConsultationErrorMessage } from "@constant/message";
import { ICheckOrderScheduleOverlaps } from "@contract";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PatientOrderRepository } from "../repository/patient-order.repository";

@Injectable()
export class PatientOrderService {
	constructor(private readonly repository: PatientOrderRepository) {}

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
		const result = await this.repository.getOverlapsConsultation(reqBody);

		if (result) {
			throw new UnprocessableEntityException(
				ConsultationErrorMessage.ERR_ORDER_SCHEDULE_OVERLAPS,
			);
		}

		return reqBody;
	}
}
