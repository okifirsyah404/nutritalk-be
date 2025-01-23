import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { seedImage } from "./seeder/image.seed";
import seedNutritionist from "./seeder/nutritionist.seed";
import seedPatient from "./seeder/patient.seed";
import seedPermission from "./seeder/permission.seed";
import { seedSchedule } from "./seeder/schedule.seed";
import seedTransaction from "./seeder/transaction.seed";

const prisma = new PrismaClient();
const logger = new Logger("Seeder");

async function main(): Promise<void> {
	logger.log(`Seeding data in ${process.env.NODE_ENV} environment...`);
	await seedPermission(prisma);
	await seedNutritionist(prisma);
	await seedSchedule(prisma);
	await seedPatient(prisma);
	await seedImage(prisma);
	await seedTransaction(prisma);
}

main()
	.then(async () => {
		logger.log("Seed data complete");
		await prisma.$disconnect();
		process.exit(0);
	})
	.catch(async (e) => {
		logger.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
