import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import Fastify, { FastifyInstance } from 'fastify';

import { AppModule } from './AppModule';

async function bootstrap() {
  // 应用实例
  const application: FastifyInstance = Fastify();

  // 配适器
  const adapter = new FastifyAdapter(application);

  // 实例
  const instance = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  // 兼容云函数
  if (!process.env.TENCENTCLOUD_RUNENV) {
    // 监听端口
    const port = process.env.PORT || 3000;

    // 监听地址
    const address = process.env.HOST || '0.0.0.0';

    // 监听
    await instance.listen(port, address);

    // 链接地址
    const url = await instance.getUrl();

    // 输出日志
    console.log(
      `
         __  __  ____   ___  ____  _____  __    ____  
        (  \\/  )(_  _) / __)(  _ \\(  _  )(  )  (  _ \\ 
         )    (  _)(_ ( (__  )   / )(_)(  )(__  )(_) )
        (_/\\/\\_)(____) \\___)(_)\\_)(_____)(____)(____/ 

        🚀 Application listen on %s
      `,
      url,
    );
  } else {
    // 初始化
    await instance.init();
  }

  // 返回应用实例
  return application;
}

// 非云函数下启动运行
if (!process.env.TENCENTCLOUD_RUNENV) {
  bootstrap();
}
