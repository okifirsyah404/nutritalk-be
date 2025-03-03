import { PrismaService } from "@config/prisma";
import { IBmiLimitEntity } from "@contract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BmiRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getBmiLimits(): Promise<IBmiLimitEntity[]> {
		return this.prisma.bmiLimit.findMany();
	}

	async getBmiLimitByValue(bmi: number): Promise<IBmiLimitEntity> {
		return this.prisma.bmiLimit.findFirst({
			where: {
				AND: [
					{
						min: {
							lte: bmi,
						},
					},
					{
						max: {
							gte: bmi,
						},
					},
				],
			},
		});
	}
}
