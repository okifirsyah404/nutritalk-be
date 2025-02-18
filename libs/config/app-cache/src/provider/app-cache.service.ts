import { AppConfigService } from "@config/app-config";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class AppCacheService {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		private readonly config: AppConfigService,
	) {}

	async set<T>(
		key: string,
		value: T,
		options?: {
			ttl?: number;
		},
	): Promise<void> {
		await this.cacheManager.set(
			key,
			value,
			options.ttl || this.config.redisConfig.ttl,
		);
	}

	async setBuilder<T>(
		keyBuilder: (...args: any[]) => string,
		value: T,
		options?: {
			ttl?: number;
		},
	): Promise<void> {
		await this.set(keyBuilder(value), value, options);
	}

	async get<T>(key: string): Promise<T> {
		return this.cacheManager.get(key);
	}
}
