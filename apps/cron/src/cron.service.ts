import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class CronService {
	private readonly logger = new Logger(CronService.name);

	@Cron("*/5 * * * * *") // Runs every 5 seconds
	handleCron(): void {
		this.logger.debug("Cron job executed!");
	}
}
