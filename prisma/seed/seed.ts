import { PrismaClient } from '@prisma/client';
import { seedImage } from './seeder/image.seed';
import seedNutritionist from './seeder/nutritionist.seed';
import seedPatient from './seeder/patient.seed';
import seedTransaction from './seeder/transaction.seed';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log(`Seeding data in ${process.env.NODE_ENV} environment...`);
  await seedNutritionist(prisma);
  await seedPatient(prisma);
  await seedImage(prisma);
  await seedTransaction(prisma);
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
