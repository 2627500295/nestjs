import { Injectable, OnApplicationShutdown } from '@nestjs/common';

import type { Browser } from 'puppeteer-core';

@Injectable()
export class PuppeteerService implements OnApplicationShutdown {
  public constructor(private readonly browser: Browser) {}

  /**
   * 监听应用关闭
   */
  public async onApplicationShutdown() {
    await this.browser.close();
  }
}
