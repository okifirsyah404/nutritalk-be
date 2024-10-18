import { NestFactory } from '@nestjs/core';
import { CronModule } from './cron.module';

async function bootstrap(): Promise<void> {
  await NestFactory.createApplicationContext(CronModule);
}
bootstrap();
