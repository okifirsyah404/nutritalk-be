import { PrismaService } from "@config/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistAuthSsoRepository {
	constructor(private readonly prisma: PrismaService) {}
}
