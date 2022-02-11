import { Module } from '@nestjs/common';

import { ApplicationModule } from './Application/ApplicationModule';

import { HomeController, ReceiverController } from './Interface/Controller';

@Module({
  imports: [ApplicationModule],
  providers: [],
  controllers: [HomeController, ReceiverController],
  exports: [],
})
export class AppModule {}
