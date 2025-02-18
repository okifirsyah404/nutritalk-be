import { AccountRole } from "@prisma/client";

export class UriUtil {
	uriFromRoleBase(role: AccountRole, path: string): string {
		if (path.startsWith("/")) {
			return `${role.toLowerCase()}${path}`;
		}
		return `${role.toLowerCase()}/${path}`;
	}

	static uriFromRoleBase(role: AccountRole, path: string): string {
		return new UriUtil().uriFromRoleBase(role, path);
	}
}
