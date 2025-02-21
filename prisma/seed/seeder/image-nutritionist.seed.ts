import * as awsS3 from "@aws-sdk/client-s3";
import { Logger } from "@nestjs/common";
import { Gender, Prisma, PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const seedBasePath = path.join(process.cwd(), "public_seeder", "images");

const defaultSeedPath = path.join(seedBasePath, "glob");

export async function seedNutritionistImage(
	prisma: PrismaClient,
	s3: awsS3.S3Client,
): Promise<void> {
	const logger = new Logger("NutritionistImageSeeder");

	try {
		const bucketName = process.env.S3_BUCKET_NAME;

		await deleteObjectsAndDir(s3, bucketName, "nutritionist");

		const nutritionists = await prisma.nutritionist.findMany({
			select: {
				id: true,
				profile: true,
			},
		});

		for (const nutritionist of nutritionists) {
			const defaultKey = await seedDefaultImage(
				s3,
				bucketName,
				nutritionist,
				prisma,
			);

			await seedRawImage(s3, bucketName, nutritionist, prisma, defaultKey);

			// Delay for 1 second to avoid rate limiting
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		logger.log("Nutritionist images seeded successfully");
	} catch (error) {
		logger.error("There's an error when seeding nutritionist images");

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

async function seedDefaultImage(
	s3: awsS3.S3Client,
	bucketName: string,
	nutritionist: {
		id: string;
		profile: {
			id: string;
			name: string;
			gender: Gender;
			phoneNumber: string | null;
			address: string | null;
			placeOfBirth: string | null;
			dateOfBirth: Date | null;
			age: number | null;
			imageKey: string | null;
			createdAt: Date;
			updatedAt: Date;
		};
	},
	prisma: PrismaClient,
): Promise<string> {
	let imagePath = defaultSeedPath;

	if (nutritionist.profile?.gender === Gender.MALE) {
		imagePath = path.join(defaultSeedPath, "male.png");
	}

	if (nutritionist.profile?.gender === Gender.FEMALE) {
		imagePath = path.join(defaultSeedPath, "female.png");
	}

	if (!fs.existsSync(imagePath)) {
		throw new Error(`File not found: ${imagePath}`);
	}

	const key = `nutritionist/${nutritionist.id}/${nutritionist.id}${path.extname(imagePath)}`;

	await uploadImage(s3, bucketName, key, imagePath);

	await updateImageKey(prisma, nutritionist.id, key);

	return key;
}

async function seedRawImage(
	s3: awsS3.S3Client,
	bucketName: string,
	nutritionist: {
		id: string;
		profile: Prisma.ProfileGetPayload<{}>;
	},
	prisma: PrismaClient,
	defaultKey?: string,
): Promise<void> {
	const imageDir = path.join(seedBasePath, "nutritionist");

	const imageFiles = fs.readdirSync(imageDir);

	const imageFilesName = imageFiles.map((fileName) => {
		return fileName.replace(/\.(jpg|png|jpeg)$/, "");
	});

	const imageFilesExt = imageFiles.map((fileName) => {
		return path.extname(fileName);
	});

	for (const fileName of imageFilesName) {
		if (nutritionist.profile?.name.includes(fileName)) {
			if (defaultKey) {
				await deleteImage(s3, bucketName, defaultKey);
			}
			const ext = imageFilesExt[imageFilesName.indexOf(fileName)];

			const imagePath = path.join(imageDir, `${fileName}${ext}`);
			const key = `nutritionist/${nutritionist.id}/${nutritionist.id}${ext}`;

			await uploadImage(s3, bucketName, key, imagePath);

			await updateImageKey(prisma, nutritionist.id, key);
		}
	}
}

async function updateImageKey(
	prisma: PrismaClient,
	nutritionistId: string,
	imageKey: string,
): Promise<void> {
	await prisma.nutritionist.update({
		where: {
			id: nutritionistId,
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

async function deleteImage(
	s3: awsS3.S3Client,
	bucketName: string,
	key: string,
): Promise<void> {
	await s3.send(
		new awsS3.DeleteObjectCommand({
			Bucket: bucketName,
			Key: key,
		}),
	);
}
