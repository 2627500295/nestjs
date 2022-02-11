import { Injectable, Inject, CACHE_MANAGER, CacheStore, CacheStoreSetOptions } from '@nestjs/common';

@Injectable()
export class CacheService {
  public constructor(@Inject(CACHE_MANAGER) private cache: CacheStore) {}

  public async get<T = any>(key: string): Promise<T> {
    return this.cache.get<T>(key);
  }

  public async set<T = any>(key: string, value: T, ttl?: number): Promise<void> {
    const options: CacheStoreSetOptions<T> = {};
    if (ttl) options.ttl = ttl;
    return this.cache.set(key, value, options);
  }

  public async invalidate(key: string): Promise<void> {
    return this.cache.del(key);
  }
}
