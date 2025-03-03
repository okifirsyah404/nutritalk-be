import { IAccountEntity, IRoleEntity } from "@contract";

export class NutritionistChangePasswordResponse implements IAccountEntity {
	private constructor(
		id: string,
		email: string,
		role: IRoleEntity,
		lastActivity: Date,
	) {
		this.id = id;
		this.email = email;
		this.role = role;
		this.lastActivity = lastActivity;
	}

	id: string;
	email: string;
	lastActivity: Date;
	role: IRoleEntity;

	static fromEntity(
		entity: IAccountEntity,
	): NutritionistChangePasswordResponse {
		return new NutritionistChangePasswordResponse(
			entity.id,
			entity.email,
			entity.role,
			entity.lastActivity,
		);
	}
}
