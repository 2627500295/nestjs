import { Controller, Get } from '@nestjs/common';

import { HomeService } from '../../Application/Service';

import { HttpResponse } from '../../Infraestrutura';

@Controller()
export class HomeController {
  public constructor(private readonly homeService: HomeService) {}

  @Get()
  public index() {
    try {
      const data = this.homeService.index();
      return HttpResponse.success(data);
    } catch (e) {
      return HttpResponse.failure(-1, 'failure', undefined);
    }
  }

  // @Get('monitor')
  // @ApiOperation({ summary: '健康监控', description: '监控快照服务状态' })
  // @ApiOkResponse({ description: '快照服务可用' })
  // @ApiServiceUnavailableResponse({ description: '快照服务器出错' })
  // public ok() {
  //   return this.homeService.ok();
  // }
  //
  // @Get('check')
  // @HealthCheck()
  // public async check() {
  //   return this.homeService.check();
  // }
}
