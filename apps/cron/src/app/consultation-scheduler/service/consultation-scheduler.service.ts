import { Injectable, Logger } from "@nestjs/common";
import { ConsultationSchedulerRepository } from "../repository/consultation-scheduler.repository";

@Injectable()
export class ConsultationSchedulerService {
	constructor(private readonly repository: ConsultationSchedulerRepository) {}

	private readonly logger = new Logger(ConsultationSchedulerService.name);

	async updateWaitingPaymentConsultation(): Promise<void> {
		const result = await this.repository.updateWaitingPaymentConsultation();

		this.logger.log(
			`Updated ${result} consultations from WAITING_PAYMENT to CANCELED_PAYMENT status due to waiting payment.`,
		);
	}

	async updateWaitingConfirmationConsultation(): Promise<void> {
		const result =
			await this.repository.updateWaitingConfirmationConsultation();

		this.logger.log(
			`Updated ${result} consultations from WAITING_CONFIRMATION to CANCELED status.`,
		);
	}

	async updateScheduledConsultation(): Promise<void> {
		const result = await this.repository.updateScheduledConsultation();

		this.logger.log(
			`Updated ${result} consultations from SCHEDULED or RE_SCHEDULED to ON_PROCESS status.`,
		);
	}

	async updateOnProcessConsultation(): Promise<void> {
		const result = await this.repository.updatOnProcessConsultation();

		this.logger.log(
			`Updated ${result} consultations from ON_PROCESS to FINISHED status.`,
		);
	}
}
