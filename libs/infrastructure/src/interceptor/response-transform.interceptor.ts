/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => {
				return this.transformResponse(data);
			}),
		);
	}

	private transformResponse(data: any): any {
		// Recursively transform camelCase keys to kebab-case
		if (typeof data === "object" && data !== null) {
			return Object.keys(data).reduce((acc, key) => {
				const kebabKey = key.replace(
					/[A-Z]/g,
					(match) => `-${match.toLowerCase()}`,
				);
				acc[kebabKey] =
					typeof data[key] === "object"
						? this.transformResponse(data[key])
						: data[key];
				return acc;
			}, {});
		}
		return data;
	}
}
