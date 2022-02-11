import { UserAgentDTO } from '../../../Interface/DTO/UserAgentDTO';

export abstract class ReceiverService {
  public abstract receiver(url: string, ua?: UserAgentDTO): Promise<string>;
}
