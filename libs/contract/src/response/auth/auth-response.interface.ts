import { IJwtToken } from "@contract";
import { AccountRole } from "@prisma/client";

export interface IAuthResponse extends IJwtToken {
	accountRole: AccountRole;
}
