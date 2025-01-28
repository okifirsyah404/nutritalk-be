import { IScheduleTimeEntity } from "@contract";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateScheduleTimeRequest
	implements Pick<IScheduleTimeEntity, "start" | "end">
{
	@Type(() => Date)
	@IsDate()
	@IsNotEmpty()
	start: Date;

	@Type(() => Date)
	@IsDate()
	@IsNotEmpty()
	end: Date;
}
