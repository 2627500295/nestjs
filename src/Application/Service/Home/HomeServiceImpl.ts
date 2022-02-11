import { Injectable } from '@nestjs/common';

import { HomeService } from './HomeService';

@Injectable()
export class HomeServiceImpl implements HomeService {
  public index() {
    return {
      title: 'ok',
    };
  }
}
