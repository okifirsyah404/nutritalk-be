import { DayOfWeekEnum } from "@contract";
import { Injectable, Logger } from "@nestjs/common";
import moment from "moment-timezone";
import { AutoAvailableSchedulerRepository } from "../repository/auto-available-scheduler.repository";

@Injectable()
export class AutoAvailableSchedulerService {
	constructor(private readonly repository: AutoAvailableSchedulerRepository) {}

	private readonly logger = new Logger(AutoAvailableSchedulerService.name);

	async updateAvavilability(): Promise<void> {
		const now = moment(new Date()).tz("Asia/Jakarta");
		const dayOfWeek = now.format("dddd").toUpperCase() as DayOfWeekEnum;

		await this.repository.setAvailableNutritionist(dayOfWeek);
		this.logger.log(`Updated availability for nutritionists on ${dayOfWeek}`);
	}

	async setUnavailableNutritionist(): Promise<void> {
		await this.repository.setUnavailableNutritionist();
		this.logger.log("Set all nutritionists to unavailable");
	}
}
