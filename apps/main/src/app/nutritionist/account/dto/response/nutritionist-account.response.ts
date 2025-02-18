import { IAccountEntity, IRoleEntity, ISingleSignOnEntity } from "@contract";

export class NutritionistAccountResponse implements IAccountEntity {
	private constructor(account: IAccountEntity) {
		this.id = account.id;
		this.email = account.email;
		this.lastActivity = account.lastActivity;
		this.role = account.role;
		this.sso = account.sso;
		this.createdAt = account.createdAt;
		this.updatedAt = account.updatedAt;
	}
	password?: string;
	refreshToken?: string;
	roleId?: string;
	id: string;
	email: string;
	lastActivity: Date;
	role: IRoleEntity;
	sso?: ISingleSignOnEntity;
	createdAt?: Date;
	updatedAt?: Date;

	public static fromEntity(
		account: IAccountEntity,
	): NutritionistAccountResponse {
		return new NutritionistAccountResponse(account);
	}
}
