import { Length, IsString, IsOptional } from 'class-validator';

/**
 * Customize User Agent
 */
export class UserAgentDTO {
  /**
   * 名称
   */
  @Length(2, 10)
  @IsString()
  @IsOptional()
  public name: string = 'SnapshotBot';

  /**
   * 版本
   */
  @Length(2, 10)
  @IsString()
  @IsOptional()
  public version: string = '1.0.0';

  /**
   * 设置 UserAgent 名称
   *
   * @param name - 名称
   */
  public setName(name: string) {
    if (name) {
      this.name = name;
    }

    return this;
  }

  /**
   * 设置 UserAgent 版本
   *
   * @param version - 名称
   */
  public setVersion(version: string) {
    if (version) {
      this.version = version;
    }

    return this;
  }
}
