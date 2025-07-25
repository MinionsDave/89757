import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

// ! 必须在最前面就初始化
// 否则常量会没有值
config();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      json: true,
    }),
  });
  await app.listen(3000);
}
bootstrap();
