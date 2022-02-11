import { Module } from '@nestjs/common';

import { IpProvider } from './Service/Ip';

@Module({
  imports: [],
  controllers: [],
  providers: [IpProvider],
  exports: [IpProvider],
})
export class ApplicationModule {}
