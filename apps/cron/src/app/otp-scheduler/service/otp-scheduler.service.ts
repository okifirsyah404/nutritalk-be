import { Injectable, Logger } from "@nestjs/common";
import { OtpSchedulerRepository } from "../repository/otp-scheduler.repository";

@Injectable()
export class OtpSchedulerService {
	constructor(private readonly repository: OtpSchedulerRepository) {}

	private readonly logger = new Logger(OtpSchedulerService.name);

	/**
	 * Deletes multiple OTP (One-Time Password) entries from the repository.
	 *
	 * @returns {Promise<void>} A promise that resolves when the OTP entries have been deleted.
	 */
	async deleteManyOtp(): Promise<void> {
		await this.repository.deleteManyOtp();
		this.logger.log("Deleted all OTP data");
	}
}
