/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class KebabToCamelCasePipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata): any {
		if (typeof value === "object" && value !== null) {
			return this.toCamelCase(value);
		}
		return value;
	}

	private toCamelCase(obj: any): any {
		return Object.keys(obj).reduce((acc, key) => {
			const camelKey = key.replace(/-([a-z])/g, (match) =>
				match[1].toUpperCase(),
			);
			acc[camelKey] =
				typeof obj[key] === "object" && obj[key] !== null
					? this.toCamelCase(obj[key])
					: obj[key];
			return acc;
		}, {});
	}
}
