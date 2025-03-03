import { Injectable } from "@nestjs/common";
import { PrismaService } from "@config/prisma";

@Injectable()
export class PatientBmiRepository {
	constructor(private readonly prisma: PrismaService) {}
}
