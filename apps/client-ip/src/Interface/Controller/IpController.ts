import { Controller, Get, Head, Req } from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import { IpService } from '../../Application/Service/Ip';

@Controller()
export class IpController {
  public constructor(private readonly ipService: IpService) {}

  @Get()
  public getClientIp(@Req() request: FastifyRequest): string {
    return this.ipService.getClientIp(request);
  }

  @Head()
  public getClientIpHeader(@Req() request: FastifyRequest) {
    return this.ipService.getClientIp(request);
  }
}
