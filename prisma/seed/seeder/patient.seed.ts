import { faker } from '@faker-js/faker';
import { Gender, PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../helper/crypto-helper';

async function seedPatient(prisma: PrismaClient): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    console.log(
      '------------- Skipping patient seed in production... -------------',
    );
    return;
  }

  try {
    console.log('------------- Deleting all patient data... -------------');

    await prisma.profile.deleteMany({
      where: {
        nutritionist: {
          account: {
            role: Role.PATIENT,
          },
        },
      },
    });
    await prisma.account.deleteMany({
      where: {
        role: Role.PATIENT,
      },
    });
    await prisma.patient.deleteMany();
    console.log('------------- Deleted all patient data -------------');

    await prisma.patient.create({
      data: {
        account: {
          create: {
            email: 'johndoe@example.com',
            password: await hashPassword('johndoe@example.com'),
            role: Role.PATIENT,
          },
        },
        profile: {
          create: {
            name: 'John Doe',
            phoneNumber: '081234567890',
            placeOfBirth: 'Jember',
            address: 'Jl. Raya Jember No. 123',
            gender: Gender.MALE,
          },
        },
      },
    });

    for (let i = 0; i < 50; i++) {
      const email = faker.internet.email();

      await prisma.patient.create({
        data: {
          account: {
            create: {
              email: email,
              password: await hashPassword(email),
              role: Role.PATIENT,
            },
          },
          profile: {
            create: {
              name: faker.person.fullName(),
              phoneNumber: faker.phone.number(),
              placeOfBirth: faker.location.city(),
              address: faker.location.streetAddress(),
              gender: Gender.MALE,
            },
          },
        },
      });
    }

    console.log('------------- Seed patient complete -------------');
  } catch (error) {
    console.error(
      "------------- There's an error when seeding patient data -------------",
    );
    throw error;
  }
}

export default seedPatient;
