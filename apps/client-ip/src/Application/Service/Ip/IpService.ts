import type { FastifyRequest } from 'fastify';

export abstract class IpService {
  public abstract getClientIp(request: FastifyRequest): string;
}
