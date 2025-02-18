import { Injectable } from "@nestjs/common";

@Injectable()
export class GeneralUtil {
	simpleTernaryTransform<T, R>(
		value: T | null | undefined,
		transform: (value: T) => R,
	): R | undefined {
		if (value == null) {
			return undefined; // Handle sync and async return types
		}

		return transform(value);
	}

	simpleTernaryTransformAsync<T, R>(
		value: T | null | undefined,
		transform: (value: T) => Promise<R>,
	): Promise<R | undefined> {
		if (value == null) {
			return Promise.resolve(undefined);
		}

		return transform(value);
	}

	static simpleTernaryTransform<T, R>(
		value: T | null | undefined,
		transform: (value: T) => R,
	): R | undefined {
		return new GeneralUtil().simpleTernaryTransform(value, transform);
	}

	static simpleTernaryTransformAsync<T, R>(
		value: T | null | undefined,
		transform: (value: T) => Promise<R>,
	): Promise<R | undefined> {
		return new GeneralUtil().simpleTernaryTransformAsync(value, transform);
	}
}
