import {CacheModule as CacheManager, CacheModuleOptions, CacheModuleAsyncOptions, Global, Module} from '@nestjs/common';
import { CacheService } from './cache.service';

@Global()
@Module({})
export class CacheModule {
  public static forRoot(options: CacheModuleOptions) {
    return {
      module: CacheModule,
      imports: [CacheManager.register(options)],
      providers: [CacheService],
      exports: [CacheService]
    }
  }

  public static forRootAsync(options: CacheModuleAsyncOptions) {
    return {
      module: CacheModule,
      imports: [CacheManager.registerAsync(options)],
      providers: [CacheService],
      exports: [CacheService]
    }
  }
}
