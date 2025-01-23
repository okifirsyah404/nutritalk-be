import { Module } from "@nestjs/common";
import { ScheduleService } from "./service/schedule.service";
import { ScheduleController } from "./controller/schedule.controller";
import { ScheduleRepository } from "./repository/schedule.repository";

@Module({
	controllers: [ScheduleController],
	providers: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
