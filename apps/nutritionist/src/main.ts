import swaggerDocumentBuilder from '@common/docs/swagger-document.builder';
import { AppConfigService } from '@config/app-config';
import HttpExceptionFilter from '@infrastructure/filter/http-exception.filter';
import CreateLogLevel from '@infrastructure/logger/create-log-level';
import { validationExceptionFactory } from '@infrastructure/validation/validation.factory';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocsTag } from './common/docs/docs';
import metadata from './metadata';
import { NutritionistModule } from './nutritionist.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    NutritionistModule,
    {
      logger: CreateLogLevel(process.env.NODE_ENV),
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors): any => validationExceptionFactory(errors),
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await swaggerDocumentBuilder(app, {
    title: 'Nutritionist App',
    description: 'Nutritionist App API Documentation',
    version: '1.0',
    tags: DocsTag.tags,
    metadata: metadata,
  });

  const appConfig = app.get(AppConfigService).appConfig;
  const config = app.get(AppConfigService).appNutritionistConfig;

  await app.listen(config.port, appConfig.host);

  new Logger('Nutritionist App').log(
    `Nutritionist App is running on: ${await app.getUrl()} with ${appConfig.env} environment`,
  );
}

bootstrap();
