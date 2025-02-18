import { IAccountEntity, IRoleEntity } from "@contract";

export class NutritionistChangePasswordResponse implements IAccountEntity {
	private constructor(id: string, email: string, role: IRoleEntity) {
		this.id = id;
		this.email = email;
		this.role = role;
	}

	id: string;
	email: string;
	role: IRoleEntity;

	static fromEntity(
		entity: IAccountEntity,
	): NutritionistChangePasswordResponse {
		return new NutritionistChangePasswordResponse(
			entity.id,
			entity.email,
			entity.role,
		);
	}
}
