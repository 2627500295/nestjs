import { Injectable } from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import get from 'lodash/get';

import { IpService } from './IpService';

@Injectable()
export class IpServiceImpl implements IpService {
  public getClientIp(request: FastifyRequest): string {
    if (get(request.headers, 'x-forwarded-for')) {
      return get(request.headers, 'x-forwarded-for');
    }

    if (get(request.headers, 'x-forwarded-for')) {
      return get(request.headers, 'x-real-ip');
    }

    if (get(request.headers, 'proxy-client-ip')) {
      return get(request.headers, 'proxy-client-ip');
    }

    if (get(request.headers, 'wl-proxy-client-ip')) {
      return get(request.headers, 'wl-proxy-client-ip');
    }

    return request.ip;
  }
}
