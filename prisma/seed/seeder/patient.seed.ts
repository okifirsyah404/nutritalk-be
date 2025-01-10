import { faker } from "@faker-js/faker";
import { Logger } from "@nestjs/common";
import { AccountRole, Gender, PrismaClient } from "@prisma/client";
import { hashPassword } from "../helper/crypto-helper";

async function seedPatient(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("PatientSeeder");

	if (process.env.NODE_ENV === "production") {
		logger.log("Skipping patient seed in production...");
		return;
	}

	try {
		logger.log("Deleting all patient data...");

		await prisma.profile.deleteMany({
			where: {
				nutritionist: {
					account: {
						role: {
							accoutRole: AccountRole.PATIENT,
						},
					},
				},
			},
		});
		await prisma.account.deleteMany({
			where: {
				role: {
					accoutRole: AccountRole.PATIENT,
				},
			},
		});
		await prisma.patient.deleteMany();
		logger.log("Deleted all patient data");

		const permission = await prisma.basePermission.findMany({
			where: {
				key: {
					contains: "PATIENT_SELF",
				},
			},
		});

		await prisma.patient.create({
			data: {
				account: {
					create: {
						email: "johndoe@example.com",
						password: await hashPassword("johndoe@example.com"),
						role: {
							create: {
								accoutRole: AccountRole.PATIENT,
								permissions: {
									createMany: {
										data: permission.map((p) => ({
											basePermissionId: p.id,
											isPermitted: true,
										})),
									},
								},
							},
						},
					},
				},
				profile: {
					create: {
						name: "John Doe",
						phoneNumber: "081234567890",
						placeOfBirth: "Jember",
						address: "Jl. Raya Jember No. 123",
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

		logger.log("Seed patient complete");
	} catch (error) {
		logger.error("There's an error when seeding patient data");
		throw error;
	}
}

export default seedPatient;
