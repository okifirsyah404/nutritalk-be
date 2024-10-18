import { AppConfigService } from '@config/app-config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TagObject } from './tag';

/**
 * Builds the Swagger document for the application.
 * @param app - The Nest application instance.
 */
export default async function swaggerDocumentBuilder(
  app: INestApplication<any>,
  options: {
    title: string;
    description: string;
    version: string;
    tags: TagObject[];
    metadata: () => Promise<Record<string, any>>;
  },
): Promise<void> {
  const config = app.get(AppConfigService).docsConfig;

  await SwaggerModule.loadPluginMetadata(options.metadata);

  const documentBuilder = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version)
    .addBearerAuth()
    .setContact(
      config?.contact?.name || '',
      config?.contact?.url || '',
      config?.contact?.email || '',
    )
    .build();

  documentBuilder.tags = options.tags;

  const document = SwaggerModule.createDocument(app, documentBuilder, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup(config?.endpoint ?? '/docs', app, document, {
    customSiteTitle: config?.title || '',
    customCssUrl: config?.customCss,
  });
}
