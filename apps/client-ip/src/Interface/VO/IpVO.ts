export class IpVO {
  public static valueOf(ip: string) {
    return new this(ip);
  }

  public constructor(public readonly ip: string) {}
}
