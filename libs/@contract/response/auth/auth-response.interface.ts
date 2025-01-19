import { IJwtToken } from "@jwt/app-jwt";
import { AccountRole } from "@prisma/client";

export interface IAuthResponse extends IJwtToken {
	accountRole: AccountRole;
}
