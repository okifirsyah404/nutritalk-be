import { Module } from "@nestjs/common";
import { ConsultationSchedulerRepository } from "./repository/consultation-scheduler.repository";
import { ConsultationSchedulerService } from "./service/consultation-scheduler.service";

@Module({
	providers: [ConsultationSchedulerService, ConsultationSchedulerRepository],
	exports: [ConsultationSchedulerService],
})
export class ConsultationSchedulerModule {}
