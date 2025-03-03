import * as awsS3 from "@aws-sdk/client-s3";
import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const seedBasePath = path.join(process.cwd(), "prisma", "seed", "raw", "image");

export async function seedPatientImage(
	prisma: PrismaClient,
	s3: awsS3.S3Client,
): Promise<void> {
	const logger = new Logger("PatientImageSeeder");

	try {
		logger.log("Seeding patient images");

		const bucketName = process.env.S3_BUCKET_NAME;

		await deleteObjectsAndDir(s3, bucketName, "patient");

		const images = fs
			.readdirSync(seedBasePath)
			.map((file) => path.join(seedBasePath, file));

		const patients = await prisma.patient.findMany({
			select: {
				id: true,
				profile: true,
			},
		});

		for (const patient of patients) {
			const image = images[Math.floor(Math.random() * images.length)];

			const key = `patient/${patient.id}/${patient.id}${path.extname(image)}`;
			await uploadImage(s3, bucketName, key, image);
			await updateImageKey(prisma, patient.id, key);

			// Delay for 1 second to avoid rate limiting
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		logger.log("Patient images seeded successfully");
	} catch (error) {
		logger.error("There's an error when seeding patient images");

		throw error;
	}
}

async function deleteObjectsAndDir(
	s3: awsS3.S3Client,
	bucketName: string,
	mainDir: string,
): Promise<void> {
	const objects = await s3.send(
		new awsS3.ListObjectsCommand({
			Bucket: bucketName,
		}),
	);

	if (objects.Contents) {
		for (const object of objects.Contents) {
			if (object.Key.includes(mainDir)) {
				await s3.send(
					new awsS3.DeleteObjectCommand({
						Bucket: bucketName,
						Key: object.Key,
					}),
				);
			}
		}
	}
}

async function uploadImage(
	s3: awsS3.S3Client,
	bucketName: string,
	key: string,
	imagePath: string,
): Promise<void> {
	await s3.send(
		new awsS3.PutObjectCommand({
			Bucket: bucketName,
			Key: key,
			Body: fs.readFileSync(imagePath),
			ContentType: "image/*",
		}),
	);
}

async function updateImageKey(
	prisma: PrismaClient,
	patientId: string,
	imageKey: string,
): Promise<void> {
	await prisma.patient.update({
		where: {
			id: patientId,
		},
		data: {
			profile: {
				update: {
					imageKey,
				},
			},
		},
	});
}
