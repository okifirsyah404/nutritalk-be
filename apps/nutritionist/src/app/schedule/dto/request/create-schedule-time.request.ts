import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateScheduleTimeRequest {
	@Type(() => Date)
	@IsDate()
	@IsNotEmpty()
	start: Date;

	@Type(() => Date)
	@IsDate()
	@IsNotEmpty()
	end: Date;
}
