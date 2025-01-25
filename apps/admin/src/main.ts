import swaggerDocumentBuilder from "@common/docs/swagger-document.builder";
import { AppConfigService, Environment } from "@config/app-config";
import { validationExceptionFactory } from "@infrastructure";
import HttpExceptionFilter from "@infrastructure/filter/http-exception.filter";
import CreateLogLevel from "@infrastructure/logger/create-log-level";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocsTag } from "@nutritionist/common/docs/docs";
import metadata from "@nutritionist/metadata";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: CreateLogLevel(process.env.NODE_ENV),
	});

	app.use(cookieParser());

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			exceptionFactory: (errors): any => validationExceptionFactory(errors),
		}),
	);

	app.useGlobalFilters(new HttpExceptionFilter());

	const appConfig = app.get(AppConfigService).appConfig;
	const config = app.get(AppConfigService).appAdminConfig;

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: config.version,
		prefix: "api/v",
	});

	if (appConfig.env === Environment.DEV) {
		await swaggerDocumentBuilder(app, {
			title: "Admin App",
			description: "Admin App API Documentation",
			version: config.version,
			tags: DocsTag.tags,
			metadata: metadata,
		});
	}

	await app.listen(config.port, appConfig.host);

	new Logger("Admin App").log(
		`Admin App v${config.version} is running on: ${await app.getUrl()} with ${appConfig.env} environment`,
	);
}
bootstrap();
