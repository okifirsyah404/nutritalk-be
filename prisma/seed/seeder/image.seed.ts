import { S3Client } from '@aws-sdk/client-s3';
import { PrismaClient } from '@prisma/client';
import { seedNutritionistImage } from './image-nutritionist.seed';

export async function seedImage(prisma: PrismaClient): Promise<void> {
  console.log('------------- Seeding image data... -------------');

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

  console.log('------------- Image data seeded successfully -------------');
}
