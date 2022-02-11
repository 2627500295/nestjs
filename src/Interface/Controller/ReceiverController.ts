import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { HttpResponse } from '../../Infraestrutura';

import { ReceiverService } from '../../Application/Service';

import { ReceiverDTO, UserAgentDTO } from '../DTO';

@Controller('receiver')
export class ReceiverController {
  public constructor(private readonly receiverService: ReceiverService) {}

  @Get()
  public async receiver(@Query() params: ReceiverDTO) {
    if (!params.url) {
      throw new BadRequestException(HttpResponse.failure(40000, '请输入正确的参数'));
    }

    const ua = new UserAgentDTO().setName(params.ua_name).setVersion(params.ua_version);

    const data = await this.receiverService.receiver(params.url, ua);

    return HttpResponse.success(data);
  }
}
