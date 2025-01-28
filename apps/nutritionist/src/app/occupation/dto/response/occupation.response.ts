import { IOccupationEntity } from "@contract";

export class OccupationResponse implements IOccupationEntity {
	private constructor(
		id: string,
		name: string,
		workPlace: string,
		experience: number,
	) {
		this.id = id;
		this.name = name;
		this.workPlace = workPlace;
		this.experience = experience;
	}

	id: string;
	name: string;
	workPlace: string;
	experience: number;

	static fromEntity(entity: IOccupationEntity): OccupationResponse {
		return new OccupationResponse(
			entity.id,
			entity.name,
			entity.workPlace,
			entity.experience,
		);
	}
}
