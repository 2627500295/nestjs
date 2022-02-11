import { UserAgentDTO } from '../../../Interface/DTO/UserAgentDTO';

export abstract class SnapshotService {
  public abstract take(url: string, ua?: UserAgentDTO): Promise<string>;
}
