import { Provider } from '@nestjs/common';

import { ReceiverService } from './ReceiverService';

import { ReceiverServiceImpl } from './ReceiverServiceImpl';

export const ReceiverProvider: Provider = {
  provide: ReceiverService,
  useClass: ReceiverServiceImpl,
};
