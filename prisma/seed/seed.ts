import { PrismaClient } from '@prisma/client';
import { seedImage } from './seeder/image.seed';
import seedNutritionist from './seeder/nutritionist.seed';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await seedNutritionist(prisma);
  await seedImage(prisma);
}

main()
  .then(async () => {
    console.log('Seed data complete');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
