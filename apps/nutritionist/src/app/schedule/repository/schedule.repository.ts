import { PrismaService } from "@database/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ScheduleRepository {
	constructor(private readonly prisma: PrismaService) {}
}
