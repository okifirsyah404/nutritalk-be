import { PrismaService } from "@config/prisma";

export class AutoAvailableSchedulerRepository {
	constructor(private readonly prisma: PrismaService) {}
}
