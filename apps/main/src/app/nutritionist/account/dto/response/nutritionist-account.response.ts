import { IAccountEntity, IRoleEntity } from "@contract";
import { AccountRole } from "@prisma/client";

export class NutritionistAccountResponse implements IAccountEntity {
	private constructor(account: IAccountEntity) {
		this.id = account.id;
		this.email = account.email;
		this.lastActivity = account.lastActivity;
		this.role = account.role;
		this.createdAt = account.createdAt;
		this.updatedAt = account.updatedAt;
	}
	id: string;
	email: string;
	lastActivity?: Date;
	role: IRoleEntity;
	createdAt?: Date;
	updatedAt?: Date;

	public static fromEntity(
		account: IAccountEntity,
	): NutritionistAccountResponse {
		return new NutritionistAccountResponse(account);
	}

	static readonly exampleData: NutritionistAccountResponse = {
		id: "cm32r86wi000b3vptrq0792sp",
		email: "johndoe@example.com",
		lastActivity: new Date(),
		role: {
			id: "cm32r86wi000b3vptrq0792sp",
			accountRole: AccountRole.NUTRITIONIST,
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}
