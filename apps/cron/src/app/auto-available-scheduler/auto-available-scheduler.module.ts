import { Module } from "@nestjs/common";
import { AutoAvailableSchedulerService } from "./service/auto-available-scheduler.service";

@Module({
	providers: [AutoAvailableSchedulerService],
	exports: [AutoAvailableSchedulerService],
})
export class AutoAvailableSchedulerModule {}
