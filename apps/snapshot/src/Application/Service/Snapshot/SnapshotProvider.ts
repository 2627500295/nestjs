import { Provider } from '@nestjs/common';

import { SnapshotService } from './SnapshotService';

import { SnapshotServiceImpl } from './SnapshotServiceImpl';

export const SnapshotProvider: Provider = {
  provide: SnapshotService,
  useClass: SnapshotServiceImpl,
};
