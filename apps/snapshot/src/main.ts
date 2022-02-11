import { NestFactory } from '@nestjs/core';

import { VersioningType } from '@nestjs/common';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import {DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import Fastify from 'fastify';

import { findAPortNotInUse } from 'portscanner';

import delay from 'delay';

import { isProd } from './Infraestrutura';

import { AppModule } from './AppModule';

async function bootstrap() {
  // 等待 20 秒
  // TODO: K8S 如果启动过快，网络初始化未成功，会导致连接数据库错误。
  if (isProd()) await delay(20_000);

  // ---

  // 应用实例
  const application = Fastify();

    // 配适器
  const adapter = new FastifyAdapter(application);

  // ---

  // 创建实例
  const instance = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  // 全局前缀
  instance.setGlobalPrefix('api');

  // 启用版本
  instance.enableVersioning({ type: VersioningType.URI, prefix: 'v' });

  // ---

  // Swagger 选项
  const options = new DocumentBuilder()
    .setTitle('Snapshot')
    .setDescription('Snapshot Service')
    .setVersion('1.0.0')
    .build();

  // 创建文档
  const document = SwaggerModule.createDocument(instance, options);

  // 挂载文档
  SwaggerModule.setup('/api/docs/', instance, document);

  // ---

  // 兼容云函数
  if (!process.env.TENCENTCLOUD_RUNENV) {
    // 获取端口
    const port = await findAPortNotInUse(parseInt(process.env.PORT) || 3000);

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
      url
    );
  } else {
    // 初始化
    await instance.init();
  }

  // 返回应用实例
  return application;
}

if (!process.env.TENCENTCLOUD_RUNENV) {
  bootstrap();
}
