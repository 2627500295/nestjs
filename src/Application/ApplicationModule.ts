import { Module } from '@nestjs/common';

import { PuppeteerModule } from '../Infraestrutura';

import { platform } from 'os';

import { HomeProvider, ReceiverProvider, SnapshotProvider } from './Service';

@Module({
  imports: [
    PuppeteerModule.registerAsync({
      useFactory() {
        // 参数
        const args: string[] = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars'];

        // 可执行程序路径
        let executablePath = '/usr/lib/chromium/chrome';

        // 苹果电脑 - 本地开发
        if (platform() === 'darwin') {
          executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
          // args.push('--host-rules=MAP *.proxy.beautifulpicture.cn 10.250.1.72');
        }

        return {
          executablePath,
          args,
          headless: true,
          defaultViewport: {
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true,
          },
          waitForInitialPage: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [HomeProvider, ReceiverProvider, SnapshotProvider],
  exports: [HomeProvider, ReceiverProvider, SnapshotProvider],
})
export class ApplicationModule {}
