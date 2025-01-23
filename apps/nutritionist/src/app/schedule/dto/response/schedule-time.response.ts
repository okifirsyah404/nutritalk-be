import { IScheduleTimeEntity } from "@database/prisma";

export class ScheduleTimeResponse implements IScheduleTimeEntity {
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

	static fromEntity(entity: IScheduleTimeEntity): ScheduleTimeResponse {
		return new ScheduleTimeResponse(entity);
	}

	static fromEntities(entities: IScheduleTimeEntity[]): ScheduleTimeResponse[] {
		return entities.map((entity) => ScheduleTimeResponse.fromEntity(entity));
	}

	static readonly exampleData: ScheduleTimeResponse = new ScheduleTimeResponse({
		id: "cm69ik474007ivylc9iuo9ep5",
		active: true,
		start: new Date(),
		end: new Date(),
	});
}
