import { Injectable } from '@nestjs/common';

import { ReceiverService } from './ReceiverService';

import { SnapshotService } from '../Snapshot';

import { UserAgentDTO } from '../../../Interface/DTO/UserAgentDTO';

@Injectable()
export class ReceiverServiceImpl implements ReceiverService {
  public constructor(public readonly snapshotService: SnapshotService) {}

  public async receiver(url: string, ua?: UserAgentDTO) {
    return this.snapshotService.take(url, ua);
  }
}
