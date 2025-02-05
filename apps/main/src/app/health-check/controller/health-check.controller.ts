import { PrismaService } from "@config/prisma";
import { Controller, Get } from "@nestjs/common";
import {
	HealthCheck,
	HealthCheckResult,
	HealthCheckService,
	MemoryHealthIndicator,
	PrismaHealthIndicator,
} from "@nestjs/terminus";

@Controller("health-check")
export class HealthCheckController {
	constructor(
		private readonly health: HealthCheckService,
		private readonly prismaHealth: PrismaHealthIndicator,
		private readonly memory: MemoryHealthIndicator,
		private readonly prisma: PrismaService,
	) {}

	@Get()
	@HealthCheck()
	async check(): Promise<HealthCheckResult> {
		return await this.health.check([
			(): Promise<any> =>
				this.memory.checkHeap("memory_heap", 100 * 1024 * 1024),
			(): Promise<any> => this.prismaHealth.pingCheck("database", this.prisma),
		]);
	}
}
