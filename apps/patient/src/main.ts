import { NestFactory } from "@nestjs/core";
import { PatientModule } from "./patient.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(PatientModule);
	await app.listen(3000);
}
bootstrap();
