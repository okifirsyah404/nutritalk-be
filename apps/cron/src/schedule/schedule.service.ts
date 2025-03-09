import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AutoAvailableSchedulerService } from "../app/auto-available-scheduler/service/auto-available-scheduler.service";
import { OtpSchedulerService } from "../app/otp-scheduler/service/otp-scheduler.service";
import { SignatureSchedulerService } from "../app/signature-scheduler/service/signature-scheduler.service";

@Injectable()
export class ScheduleService {
	constructor(
		private readonly otpScheduler: OtpSchedulerService,
		private readonly signatureScheduler: SignatureSchedulerService,
		private readonly autoAvailableScheduler: AutoAvailableSchedulerService,
	) {}
	private readonly logger = new Logger(ScheduleService.name);

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async everyDayAtMidnight(): Promise<void> {
		this.logger.log("Running everyDayAtMidnight");
		await this.otpScheduler.deleteManyOtp();
		await this.signatureScheduler.deleteManySignature();
	}

	@Cron(CronExpression.EVERY_DAY_AT_7AM)
	async everyDatAt7AM(): Promise<void> {
		this.logger.log("Running everyDAyAt7AM");
		await this.autoAvailableScheduler.updateAvavilability();
	}

	@Cron(CronExpression.EVERY_DAY_AT_7PM)
	async everyDayAt7PM(): Promise<void> {
		this.logger.log("Running everyDayAt7PM");
		await this.autoAvailableScheduler.setUnavailableNutritionist();
	}
}
