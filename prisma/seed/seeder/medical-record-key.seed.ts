import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

async function seedMedicalRecordKey(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("MedicalRecordSeeder");

	if (process.env.NODE_ENV === "production") {
		logger.log("Skipping medical record seed in production...");
		return;
	}

	try {
		logger.log("Deleting all medical record data...");

		await prisma.medicalRecordKey.deleteMany();

		logger.log("Deleted all medical record data");

		const dummyData: { name: string }[] = [];

		for (let i = 0; i <= 150; i++) {
			dummyData.push({ name: faker.person.fullName() });
		}

		await prisma.medicalRecordKey.createMany({
			data: dummyData,
			skipDuplicates: true,
		});

		logger.log("Seed medical record complete");
	} catch (error) {
		logger.error("There's an error when seeding medical record data");
		throw error;
	}
}

export default seedMedicalRecordKey;
