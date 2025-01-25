import { IAccountEntity, IRoleEntity } from "@contract";
import { AccountRole } from "@prisma/client";

export class AccountResponse implements IAccountEntity {
	private constructor(account: IAccountEntity) {
		this.id = account.id;
		this.email = account.email;
		this.role = account.role;
		this.createdAt = account.createdAt;
		this.updatedAt = account.updatedAt;
	}
	id: string;
	email: string;
	role: IRoleEntity;
	createdAt?: Date;
	updatedAt?: Date;

	public static fromEntity(account: IAccountEntity): AccountResponse {
		return new AccountResponse(account);
	}

	static readonly exampleData: AccountResponse = {
		id: "cm32r86wi000b3vptrq0792sp",
		email: "johndoe@example.com",
		role: {
			id: "cm32r86wi000b3vptrq0792sp",
			accountRole: AccountRole.NUTRITIONIST,
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}
