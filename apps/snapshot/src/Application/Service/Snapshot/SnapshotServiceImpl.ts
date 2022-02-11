import { ForbiddenException } from '@nestjs/common';

import type { Browser } from 'puppeteer-core';

import { HttpResponse, InjectBrowser } from '../../../Infraestrutura';

import { UserAgentDTO } from '../../../Interface/DTO';

import { SnapshotService } from './SnapshotService';

export class SnapshotServiceImpl implements SnapshotService {
  public constructor(@InjectBrowser() private readonly browser: Browser) {}

  public async take(url: string, ua?: UserAgentDTO) {
    try {
      // 获取浏览器 User Agent
      const browserUserAgent = await this.browser.userAgent();

      // 组装自定义 User Agent
      const customUserAgent = `${ua?.name ?? 'SnapshotBot'}/${ua?.version ?? '1.0.0'}`;

      // 拼合 User Agent
      const pieceUserAgent = `${browserUserAgent} ${customUserAgent}`;

      // 打开新页面
      const page = await this.browser.newPage();

      // 设置 User Agent
      await page.setUserAgent(pieceUserAgent);

      // 跳转页面
      await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
        timeout: 9000,
      });

      //延时
      await page.waitForTimeout(3_000);

      // 评估
      await page.evaluate(this.snapshotInjectState);

      // 错误捕捉
      page.on('error', (msg) => console.error('Puppeteer Error: ', msg));

      // 页面错误
      page.on('pageerror', (e) => console.error('Puppeteer Page Error: ', e));

      // 获取页面内容
      const html = await page.content();

      // 关闭页面
      page.close();

      // 返回页面内容
      return html;
    } catch (e) {
      console.log('e', e);

      throw new ForbiddenException(HttpResponse.failure(-40003, '快照失败'));
    }
  }

  /**
   * html 注入 window 挂在 store 脚本
   */
  private snapshotInjectState() {
    let scriptTagText = '';

    const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g;

    const ESCAPED_CHARS = {
      '<': '\\u003C',
      '>': '\\u003E',
      '/': '\\u002F',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029',
    };

    const snapEscape = () => {
      const escapeUnsafeChars = (unsafeChar: string) => ESCAPED_CHARS[unsafeChar];
      return (str: string) => str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);
    };

    const snapStringify = (obj: any) => {
      return snapEscape()(JSON.stringify(obj));
    };

    // @ts-ignore
    if (typeof window.snapSaveState === 'function') {
      // @ts-ignore
      const state: Record<string, any> = window.snapSaveState();
      if (Object.prototype.toString.call(state) !== '[object Object]') return;
      const keysState: string[] = Object.keys(state);
      if (!keysState.length) return;
      scriptTagText += keysState.map((key) => `window["${key}"]=${snapStringify(state[key])};`).join('');
    }

    if (scriptTagText) {
      // @ts-ignore
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.text = scriptTagText;
      // @ts-ignore
      const firstScript = Array.from(document.scripts)[0];
      // @ts-ignore
      firstScript.parentNode.insertBefore(scriptTag, firstScript);
    }
  }
}
