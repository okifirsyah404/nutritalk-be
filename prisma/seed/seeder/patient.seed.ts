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
							accountRole: AccountRole.PATIENT,
						},
					},
				},
			},
		});
		await prisma.account.deleteMany({
			where: {
				role: {
					accountRole: AccountRole.PATIENT,
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

		const medicalRecordKey = await prisma.medicalRecordKey.findFirst({
			where: {
				code: "RM-0000",
			},
			select: {
				id: true,
			},
		});

		await prisma.patient.create({
			data: {
				medicalRecordKey: {
					connect: {
						id: medicalRecordKey.id,
					},
				},
				account: {
					create: {
						email: "dev@patient.com",
						password: await hashPassword("dev@patient.com"),
						lastActivity: new Date(),
						deviceInfo: {
							create: {
								device: "device",
								fcmToken: "fcmToken",
							},
						},
						role: {
							create: {
								accountRole: AccountRole.PATIENT,
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
						imageKey: faker.image.urlPicsumPhotos({
							height: 200,
							width: 200,
						}),
						bio: faker.person.bio(),
					},
				},
			},
		});

		const dummyMedicalRecordKeys = await prisma.medicalRecordKey.findMany({
			where: {
				code: {
					not: "RM-0000",
				},
			},
			take: 50,
			orderBy: {
				code: "asc",
			},
			select: {
				id: true,
				name: true,
				code: true,
			},
		});

		for (let i = 0; i < dummyMedicalRecordKeys.length; i++) {
			const email = faker.internet.email();

			await prisma.patient.create({
				data: {
					medicalRecordKey: {
						connect: {
							id: dummyMedicalRecordKeys[i].id,
						},
					},
					account: {
						create: {
							email: email,
							password: await hashPassword(email),
							lastActivity: new Date(),
						},
					},
					profile: {
						create: {
							name: faker.person.fullName(),
							phoneNumber: faker.phone.number(),
							placeOfBirth: faker.location.city(),
							address: faker.location.streetAddress(),
							gender: Gender.MALE,
							imageKey: faker.image.urlPicsumPhotos({
								height: 200,
								width: 200,
							}),
							bio: faker.person.bio(),
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
