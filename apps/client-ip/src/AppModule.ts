import { Module } from '@nestjs/common';

import { ApplicationModule } from './Application/ApplicationModule';

import { IpController } from './Interface/Controller/IpController';

import { ApiController } from './Interface/Controller/ApiController';

@Module({
  imports: [ApplicationModule],
  controllers: [IpController, ApiController],
  providers: [],
})
export class AppModule {}
