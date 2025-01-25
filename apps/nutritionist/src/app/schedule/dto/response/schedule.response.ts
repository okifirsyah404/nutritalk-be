import { IScheduleEntity, IScheduleTimeEntity } from "@contract";
import { DayOfWeek } from "@prisma/client";
import { ScheduleTimeResponse } from "./schedule-time.response";

export class ScheduleResponse implements IScheduleEntity {
	constructor({
		id,
		active,
		dayOfWeek,
		dayOfWeekIndex,
		scheduleTimes,
	}: IScheduleEntity) {
		this.id = id;
		this.active = active;
		this.dayOfWeek = dayOfWeek;
		this.dayOfWeekIndex = dayOfWeekIndex;
		this.scheduleTimes = scheduleTimes;
	}

	id: string;
	active: boolean;
	dayOfWeek: DayOfWeek;
	dayOfWeekIndex: number;
	scheduleTimes?: IScheduleTimeEntity[];

	static fromEntity(entity: IScheduleEntity): ScheduleResponse {
		return new ScheduleResponse(entity);
	}

	static fromEntities(entities: IScheduleEntity[]): ScheduleResponse[] {
		return entities.map((entity) => ScheduleResponse.fromEntity(entity));
	}

	static readonly exampleData: ScheduleResponse = new ScheduleResponse({
		id: "cm69ik474007ivylc9iuo9ep5",
		active: true,
		dayOfWeek: DayOfWeek.MONDAY,
		dayOfWeekIndex: 1,
		scheduleTimes: [ScheduleTimeResponse.exampleData],
	});
}
