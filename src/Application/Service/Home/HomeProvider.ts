import { Provider } from '@nestjs/common';

import { HomeService } from './HomeService';

import { HomeServiceImpl } from './HomeServiceImpl';

export const HomeProvider: Provider = {
  provide: HomeService,
  useClass: HomeServiceImpl,
};
