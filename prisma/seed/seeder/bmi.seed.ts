import { Logger } from "@nestjs/common";
import { BmiStatus, Prisma, PrismaClient } from "@prisma/client";

async function seedBmi(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("BmiSeeder");

	try {
		logger.log("Deleting all bmi data...");
		await prisma.bmiLimit.deleteMany();
		logger.log("Deleted all bmi data");

		logger.log("Seeding bmi data...");

		const bmiLimits: Prisma.BmiLimitCreateInput[] = [
			{
				status: BmiStatus.UNDERWEIGHT,
				min: 0,
				max: 18.4,
			},
			{
				status: BmiStatus.NORMAL,
				min: 18.5,
				max: 24.9,
			},
			{
				status: BmiStatus.OVERWEIGHT,
				min: 25,
				max: 29.9,
			},
			{
				status: BmiStatus.OBESE,
				min: 30,
				max: 34.9,
			},
			{
				status: BmiStatus.OBESE_II,
				min: 35,
				max: 39.9,
			},
			{
				status: BmiStatus.OBESE_III,
				min: 40,
				max: 100,
			},
		];

		await prisma.bmiLimit.createMany({
			data: bmiLimits,
			skipDuplicates: true,
		});

		logger.log("Seeded bmi data");
	} catch (error) {
		logger.error("There was an error while seeding bmi data");
		throw error;
	}
}

export default seedBmi;
