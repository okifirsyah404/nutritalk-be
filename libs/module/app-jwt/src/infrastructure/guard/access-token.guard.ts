/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { JwtTokenError } from "@constant/message";
import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AccessTokenGuard extends AuthGuard("jwt") {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	handleRequest(
		err: any,
		user: any,
		info: any,
		context: ExecutionContext,
		status?: any,
	): any {
		if (err || !user) {
			if (info?.name === "TokenExpiredError") {
				throw new UnauthorizedException(JwtTokenError.ERR_TOKEN_EXPIRED);
			} else if (info?.name === "JsonWebTokenError") {
				throw new UnauthorizedException(JwtTokenError.ERR_TOKEN_INVALID);
			} else {
				throw new UnauthorizedException(JwtTokenError.ERR_TOKEN_UNAUTHORIZED);
			}
		}
		return user;
	}
}
