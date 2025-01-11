import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "./controller/health-check.controller";

@Module({
	imports: [TerminusModule],
	controllers: [HealthCheckController],
	providers: [],
})
export class HealthCheckModule {}
