import { Module } from "@nestjs/common";
import { AutoAvailableSchedulerRepository } from "./repository/auto-available-scheduler.repository";
import { AutoAvailableSchedulerService } from "./service/auto-available-scheduler.service";

@Module({
	providers: [AutoAvailableSchedulerService, AutoAvailableSchedulerRepository],
	exports: [AutoAvailableSchedulerService],
})
export class AutoAvailableSchedulerModule {}
