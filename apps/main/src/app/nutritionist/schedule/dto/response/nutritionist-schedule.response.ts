import { IScheduleEntity, IScheduleTimeEntity } from "@contract";
import { DayOfWeek } from "@prisma/client";
import { NutritionistScheduleTimeResponse } from "./nutritionist-schedule-time.response";

export class NutritionistScheduleResponse implements IScheduleEntity {
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

	static fromEntity(entity: IScheduleEntity): NutritionistScheduleResponse {
		return new NutritionistScheduleResponse(entity);
	}

	static fromEntities(
		entities: IScheduleEntity[],
	): NutritionistScheduleResponse[] {
		return entities.map((entity) =>
			NutritionistScheduleResponse.fromEntity(entity),
		);
	}

	static readonly exampleData: NutritionistScheduleResponse =
		new NutritionistScheduleResponse({
			id: "cm69ik474007ivylc9iuo9ep5",
			active: true,
			dayOfWeek: DayOfWeek.MONDAY,
			dayOfWeekIndex: 1,
			scheduleTimes: [NutritionistScheduleTimeResponse.exampleData],
		});
}
