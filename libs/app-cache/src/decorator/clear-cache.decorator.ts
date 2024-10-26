import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export const ClearCache = (
  cacheKey: ((...args: any[]) => string) | string,
): any => {
  const injectCacheManager = Inject(CACHE_MANAGER);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    injectCacheManager(target, 'cacheService');
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<void> {
      const cacheService = (
        this as PropertyDescriptor & { cacheService: Cache }
      ).cacheService;

      const keyBuilder =
        typeof cacheKey === 'function' ? cacheKey(...args) : cacheKey;

      const key = `${target.constructor.name}:${keyBuilder}`;

      await cacheService.del(key);

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
};
