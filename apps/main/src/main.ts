import { AppConfigService } from "@config/app-config";
import { validationExceptionFactory } from "@infrastructure";
import HttpExceptionFilter from "@infrastructure/filter/http-exception.filter";
import createLogLevel from "@infrastructure/logger/create-log-level";
import {
	ConsoleLogger,
	Logger,
	ValidationPipe,
	VersioningType,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new ConsoleLogger({
			timestamp: true,
			logLevels: createLogLevel(process.env.NODE_ENV),
			json: true,
			colors: true,
		}),
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

	const config = app.get(AppConfigService).appConfig;

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: config.version.toString(),
		prefix: "api/v",
	});

	await app.listen(config.port, config.host);

	new Logger("Main Api").log(
		`Main App v${config.version} is running on: ${await app.getUrl()} with ${config.env} environment`,
	);
}

bootstrap();
