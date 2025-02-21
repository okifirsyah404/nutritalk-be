import { S3Client } from "@aws-sdk/client-s3";
import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { seedNutritionistImage } from "./image-nutritionist.seed";
import { seedPatientImage } from "./image-patient.seed";

export async function seedImage(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("ImageSeeder");

	logger.log("Seeding image data...");

	const s3 = new S3Client({
		endpoint: process.env.S3_ENDPOINT,
		region: process.env.S3_REGION,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY_ID,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		},
		forcePathStyle: true,
	});

	await seedNutritionistImage(prisma, s3);
	await seedPatientImage(prisma, s3);

	logger.log("Image data seeded successfully");
}
