import { Injectable, Logger } from "@nestjs/common";
import { SignatureSchedulerRepository } from "../repository/signature-scheduler.repository";

@Injectable()
export class SignatureSchedulerService {
	constructor(private readonly repository: SignatureSchedulerRepository) {}

	private readonly logger = new Logger(SignatureSchedulerService.name);

	/**
	 * Deletes multiple signature records from the database.
	 *
	 * This method uses the repository to delete all signature records.
	 *
	 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
	 */
	async deleteManySignature(): Promise<void> {
		await this.repository.deleteManySignature();
		this.logger.log("Deleted all signature records.");
	}
}
