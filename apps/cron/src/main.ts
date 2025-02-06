import createLogLevel from "@infrastructure/logger/create-log-level";
import { ConsoleLogger, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.createApplicationContext(AppModule, {
		logger: new ConsoleLogger({
			timestamp: true,
			logLevels: createLogLevel(process.env.NODE_ENV),
			json: true,
			colors: true,
		}),
	});

	await app.init().then(() => {
		new Logger("Main Cron").log("Nutritalk Cron is running");
	});
}
bootstrap();
