import { Module } from "@nestjs/common";
import { OtpSchedulerRepository } from "./repository/otp-scheduler.repository";
import { OtpSchedulerService } from "./service/otp-scheduler.service";

@Module({
	providers: [OtpSchedulerService, OtpSchedulerRepository],
	exports: [OtpSchedulerService],
})
export class OtpSchedulerModule {}
