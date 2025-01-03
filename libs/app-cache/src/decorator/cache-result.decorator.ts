import { AppConfigLoaded } from "@config/app-config";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import moment from "moment";

export const CacheResult = <T>(
	cacheKey: ((...args: any[]) => string) | string,
	options?: { ttl?: number; unit?: moment.DurationInputArg2 },
): any => {
	const injectCacheManager = Inject(CACHE_MANAGER);

	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		injectCacheManager(target, "cacheService");
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]): Promise<T> {
			const redisConfig = await AppConfigLoaded.redisConfig();

			const ttl = moment
				.duration(options?.ttl || redisConfig.ttl, options?.unit || "seconds")
				.asMilliseconds();

			const cacheService = (
				this as PropertyDescriptor & { cacheService: Cache }
			).cacheService;

			const keyBuilder =
				typeof cacheKey === "function" ? cacheKey(...args) : cacheKey;

			const key = `${target.constructor.name}:${keyBuilder}`;

			const cacheValue: T = await cacheService.get(key);

			if (cacheValue) {
				return cacheValue;
			}

			const result = await originalMethod.apply(this, args);

			await cacheService.set(key, result, ttl);

			return result;
		};

		return descriptor;
	};
};
