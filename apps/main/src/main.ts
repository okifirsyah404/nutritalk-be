import CreateLogLevel from "@infrastructure/logger/create-log-level";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { validationExceptionFactory } from "@infrastructure";
import HttpExceptionFilter from "@infrastructure/filter/http-exception.filter";
import { AppConfigService } from "@config/app-config";

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
	const config = app.get(AppConfigService).appNutritionistConfig;

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: config.version,
		prefix: "api/v",
	});

	// if (appConfig.env === Environment.DEV) {
	// 	await swaggerDocumentBuilder(app, {
	// 		title: "Nutritionist App",
	// 		description: "Nutritionist App API Documentation",
	// 		version: config.version,
	// 		tags: DocsTag.tags,
	// 		metadata: metadata,
	// 	});
	// }

	await app.listen(config.port, appConfig.host);

	new Logger("Nutritionist App").log(
		`Nutritionist App v${config.version} is running on: ${await app.getUrl()} with ${appConfig.env} environment`,
	);
}
bootstrap();
