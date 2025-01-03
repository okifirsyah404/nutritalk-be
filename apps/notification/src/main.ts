import { AppConfigLoaded } from "@config/app-config";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { NotificationModule } from "./notification.module";

async function bootstrap(): Promise<void> {
	const amqpConfig = await AppConfigLoaded.amqpConfig();

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		NotificationModule,
		{
			transport: Transport.RMQ,
			options: {
				queue: "notification_queue",
				urls: [amqpConfig.url],
			},
		},
	);

	await app.listen().then(() => {
		new Logger("Notification Microservice").log(
			`Notification Microservice is connected on: ${amqpConfig.url}`,
		);
	});
}
bootstrap();
