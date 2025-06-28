// ! 必须在最前面就初始化
// 否则常量会没有值
import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      json: true,
    }),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
