import { Injectable } from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import get from 'lodash/get';

import { IpService } from './IpService';

@Injectable()
export class IpServiceImpl implements IpService {
  // https://github.com/WolfieLeader/get-client-ip/blob/main/src/index.ts
  public getClientIp(request: FastifyRequest): string {
    return (
      get(request.headers, "x-forwarded-for") ||
      get(request.headers, "x-real-ip") ||
      get(request.headers, "proxy-client-ip") ||
      get(request.headers, "wl-proxy-client-ip") ||
      get(request.headers, "fly-client-ip") ||
      get(request.headers, "true-client-ip") ||
      get(request.headers, "cf-connecting-ip") ||
      request.ip
    );
  }
}
