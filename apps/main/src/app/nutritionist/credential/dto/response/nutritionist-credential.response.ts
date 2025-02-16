import { INutritionistEntity } from "@contract";
import { NutritionistType } from "@prisma/client";

export class NutritionistCredentialResponse implements INutritionistEntity {
	private constructor(entity: INutritionistEntity) {
		this.id = entity.id;
		this.type = entity.type;
		this.nip = entity.nip;
		this.nidn = entity.nidn;
		this.isAvailable = entity.isAvailable;
	}

	id: string;
	nip: string;
	nidn: string;
	isAvailable: boolean;
	type: NutritionistType;

	static fromEntity(
		entity: INutritionistEntity,
	): NutritionistCredentialResponse {
		return new NutritionistCredentialResponse(entity);
	}

	static fromEntities(
		entities: INutritionistEntity[],
	): NutritionistCredentialResponse[] {
		return entities.map((entity) =>
			NutritionistCredentialResponse.fromEntity(entity),
		);
	}
}
