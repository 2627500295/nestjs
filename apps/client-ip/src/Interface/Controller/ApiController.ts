import { Controller, Get, Head, Req } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';

import { IpService } from '../../Application/Service/Ip';

import { Result } from '../../Infraestrutura/Helper';

import { IpVO } from '../VO/IpVO';

@Controller('api')
export class ApiController {
  public constructor(private readonly ipService: IpService) {}

  @Get()
  public getClientIp(@Req() request: FastifyRequest): Result<IpVO> {
    const ip = this.ipService.getClientIp(request);
    return Result.ok(IpVO.valueOf(ip));
  }

  @Head()
  public getClientIpHeader(@Req() request: FastifyRequest) {
    const ip = this.ipService.getClientIp(request);
    return Result.ok(IpVO.valueOf(ip));
  }
}
