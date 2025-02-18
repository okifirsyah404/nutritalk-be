import { IAuthResponse, IJwtToken } from "@contract";
import { AccountRole } from "@prisma/client";

export class NutritionistAuthResponse implements IAuthResponse {
	private constructor({
		accessToken,
		refreshToken,
		accountRole,
	}: IJwtToken & { accountRole: AccountRole }) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.accountRole = accountRole;
	}

	readonly accessToken: string;
	readonly refreshToken: string;
	readonly accountRole: AccountRole;

	static fromEntity(
		entity: IJwtToken & { accountRole: AccountRole },
	): NutritionistAuthResponse {
		return new NutritionistAuthResponse(entity);
	}

	static readonly exampleData: NutritionistAuthResponse =
		new NutritionistAuthResponse({
			accessToken:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
			refreshToken:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
			accountRole: AccountRole.NUTRITIONIST,
		});
}
