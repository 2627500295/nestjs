import { Module, DynamicModule, Provider } from '@nestjs/common';

import puppeteer from 'puppeteer-core';

import { v4 } from 'uuid';

import { PUPPETEER_INSTANCE, PUPPETEER_MODULE_ID, PUPPETEER_OPTIONS } from './puppeteer.constants';

import {
  PuppeteerLaunchOptions,
  PuppeteerModuleOptions,
  PuppeteerModuleAsyncOptions,
  PuppeteerModuleOptionsFactory,
} from './puppeteer.interface';

import { PuppeteerService } from './puppeteer.service';

@Module({})
export class PuppeteerModule {
  public static register(options: PuppeteerModuleOptions = {}): DynamicModule {
    return {
      module: PuppeteerModule,
      providers: [
        {
          provide: PUPPETEER_INSTANCE,
          useValue: puppeteer.launch(options),
        },
        {
          provide: PuppeteerService,
          useFactory: (browser: puppeteer.Browser) => new PuppeteerService(browser),
          inject: [PUPPETEER_INSTANCE],
        },
        {
          provide: PUPPETEER_MODULE_ID,
          useValue: v4(),
        },
      ],
      exports: [PUPPETEER_INSTANCE],
      global: options.isGlobal,
    };
  }

  public static registerAsync(options: PuppeteerModuleAsyncOptions = {}): DynamicModule {
    return {
      module: PuppeteerModule,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: PUPPETEER_INSTANCE,
          useFactory: (config: PuppeteerLaunchOptions) => puppeteer.launch(config),
          inject: [PUPPETEER_OPTIONS],
        },
        {
          provide: PuppeteerService,
          useFactory: (browser: puppeteer.Browser) => new PuppeteerService(browser),
          inject: [PUPPETEER_INSTANCE],
        },
        {
          provide: PUPPETEER_MODULE_ID,
          useValue: v4(),
        },
        ...(options.extraProviders || []),
      ],
      exports: [PUPPETEER_INSTANCE],
      global: options.isGlobal,
    };
  }

  /**
   * 创建异步提供者
   *
   * @param options - 配置
   *
   * @internal
   */
  private static createAsyncProviders(options: PuppeteerModuleAsyncOptions) {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass!,
        useClass: options.useClass!,
      },
    ];
  }

  /**
   * 创建异步配置提供者
   *
   * @param options - 配置
   *
   * @internal
   */
  private static createAsyncOptionsProvider(options: PuppeteerModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: PUPPETEER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: PUPPETEER_OPTIONS,
      useFactory: async (optionsFactory: PuppeteerModuleOptionsFactory) => optionsFactory.createPuppeteerOptions(),
      inject: [options.useExisting! || options.useClass],
    };
  }
}
