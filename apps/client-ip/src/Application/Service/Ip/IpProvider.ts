import { Provider } from '@nestjs/common';

import { IpService } from './IpService';

import { IpServiceImpl } from './IpServiceImpl';

export const IpProvider: Provider = {
  provide: IpService,
  useClass: IpServiceImpl,
};
