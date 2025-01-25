import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ScheduleService } from "./schedule/schedule.service";

@Module({
	imports: [ScheduleModule.forRoot()],
	providers: [ScheduleService],
})
export class AppModule {}
