import { Controller } from "@nestjs/common";
import { ScheduleService } from "../service/schedule.service";

@Controller("schedule")
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}
}
