import { Injectable, Logger } from "@nestjs/common";
import { ConsultationSchedulerRepository } from "../repository/consultation-scheduler.repository";

@Injectable()
export class ConsultationSchedulerService {
	constructor(private readonly repository: ConsultationSchedulerRepository) {}

	private readonly logger = new Logger(ConsultationSchedulerService.name);

	async updateWaitingPaymentConsultation(): Promise<void> {
		const result = await this.repository.updateWaitingPaymentConsultation();

		this.logger.log(
			`Updated ${result} consultations to CANCELED_PAYMENT status due to waiting payment.`,
		);
	}
}
