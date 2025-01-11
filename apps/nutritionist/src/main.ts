import swaggerDocumentBuilder from "@common/docs/swagger-document.builder";
import { AppConfigService } from "@config/app-config";
import HttpExceptionFilter from "@infrastructure/filter/http-exception.filter";
import CreateLogLevel from "@infrastructure/logger/create-log-level";
import { Logger, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { NutritionistModule } from "./app.module";
import { DocsTag } from "./common/docs/docs";
import metadata from "./metadata";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(
		NutritionistModule,
		{
			logger: CreateLogLevel(process.env.NODE_ENV),
		},
	);

	app.use(cookieParser());

	// const doubleCsrfResult = doubleCsrf({
	// 	getSecret: () => "TestToken",
	// 	cookieName: "XSRF-TOKEN",
	// 	cookieOptions: {
	// 		httpOnly: true,
	// 		secure: process.env.NODE_ENV === "production",
	// 		sameSite: "strict",
	// 	},
	// });

	// app.use(doubleCsrfResult.doubleCsrfProtection);

	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		transform: true,
	// 		whitelist: true,
	// 		forbidNonWhitelisted: true,
	// 		forbidUnknownValues: true,
	// 		exceptionFactory: (errors): any => validationExceptionFactory(errors),
	// 	}),
	// );

	app.useGlobalFilters(new HttpExceptionFilter());

	// app.useGlobalInterceptors(new ResponseTransformInterceptor());

	const appConfig = app.get(AppConfigService).appConfig;
	const config = app.get(AppConfigService).appNutritionistConfig;

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: config.version,
		prefix: "api/v",
	});

	await swaggerDocumentBuilder(app, {
		title: "Nutritionist App",
		description: "Nutritionist App API Documentation",
		version: config.version,
		tags: DocsTag.tags,
		metadata: metadata,
	});

	await app.listen(config.port, appConfig.host);

	new Logger("Nutritionist App").log(
		`Nutritionist App v${config.version} is running on: ${await app.getUrl()} with ${appConfig.env} environment`,
	);
}

bootstrap();
