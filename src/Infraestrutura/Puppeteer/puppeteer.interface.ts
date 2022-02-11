import { ModuleMetadata, Provider, Type } from '@nestjs/common';

import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product } from 'puppeteer-core';

export type PuppeteerLaunchOptions = LaunchOptions &
  BrowserLaunchArgumentOptions &
  BrowserConnectOptions & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
  };

export interface PuppeteerModuleOptions extends PuppeteerLaunchOptions {
  isGlobal?: boolean;
}

export interface PuppeteerModuleOptionsFactory {
  createPuppeteerOptions: () => PuppeteerLaunchOptions | Promise<PuppeteerLaunchOptions>;
}

/**
 * Async Options
 *
 * @public
 */
export interface PuppeteerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PuppeteerModuleOptionsFactory>;
  useClass?: Type<PuppeteerModuleOptionsFactory>;
  useFactory?: (...args: any[]) => PuppeteerLaunchOptions | Promise<PuppeteerLaunchOptions>;
  inject?: any[];
  extraProviders?: Provider[];
  isGlobal?: boolean;
}
