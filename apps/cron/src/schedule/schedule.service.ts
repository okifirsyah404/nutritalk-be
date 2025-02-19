import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { OtpSchedulerService } from "../app/otp-scheduler/service/otp-scheduler.service";
import { SignatureSchedulerService } from "../app/signature-scheduler/service/signature-scheduler.service";

@Injectable()
export class ScheduleService {
	constructor(
		private readonly otpScheduler: OtpSchedulerService,
		private readonly signatureScheduler: SignatureSchedulerService,
	) {}
	private readonly logger = new Logger(ScheduleService.name);

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async everyDayAtMidnight(): Promise<void> {
		this.logger.log("Running everyDayAtMidnight");
		await this.otpScheduler.deleteManyOtp();
		await this.signatureScheduler.deleteManySignature();
	}
}
