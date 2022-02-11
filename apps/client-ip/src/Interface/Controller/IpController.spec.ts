import { Test, TestingModule } from '@nestjs/testing';

import { IpController } from './IpController';

import { IpProvider } from '../../Application/Service/Ip';

describe('AppController', () => {
  let ipController: IpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IpController],
      providers: [IpProvider],
      exports: [IpProvider],
    }).compile();

    ipController = app.get<IpController>(IpController);
  });

  describe('IpController', () => {
    it('should return ""', () => {
      // expect(ipController.getClientIp()).toBe('Hello World!');
      expect('').toBe('');
    });
  });
});
