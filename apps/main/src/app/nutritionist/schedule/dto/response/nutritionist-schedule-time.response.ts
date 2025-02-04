import { IScheduleTimeEntity } from "@contract";

export class NutritionistScheduleTimeResponse implements IScheduleTimeEntity {
	constructor({ id, active, start, end }: IScheduleTimeEntity) {
		this.id = id;
		this.active = active;
		this.start = start;
		this.end = end;
	}

	id: string;
	active: boolean;
	start: Date;
	end: Date;

	static fromEntity(
		entity: IScheduleTimeEntity,
	): NutritionistScheduleTimeResponse {
		return new NutritionistScheduleTimeResponse(entity);
	}

	static fromEntities(
		entities: IScheduleTimeEntity[],
	): NutritionistScheduleTimeResponse[] {
		return entities.map((entity) =>
			NutritionistScheduleTimeResponse.fromEntity(entity),
		);
	}

	static readonly exampleData: NutritionistScheduleTimeResponse =
		new NutritionistScheduleTimeResponse({
			id: "cm69ik474007ivylc9iuo9ep5",
			active: true,
			start: new Date(),
			end: new Date(),
		});
}
