import { Length, IsNotEmpty, IsUrl, IsString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ReceiverDTO {
  @ApiProperty({
    required: true,
    description: 'URL',
    example: 'https://www.baidu.com',
  })
  @Length(10, 1000)
  @IsUrl()
  @IsNotEmpty()
  public url: string;

  /**
   * User Agent Name
   */
  @ApiProperty({
    required: false,
    description: 'User Agent',
    example: 'SnapshotBot',
  })
  @Length(0, 30)
  @IsString()
  @IsOptional()
  public ua_name = 'SnapshotBot';

  /**
   * User Agent Version
   */
  @ApiProperty({
    required: false,
    description: 'User Agent Version',
    example: '1.0.0',
  })
  @Length(0, 10)
  @IsString()
  @IsOptional()
  public ua_version = '1.0.0';
}
