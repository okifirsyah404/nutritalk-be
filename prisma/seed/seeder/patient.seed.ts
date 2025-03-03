import { faker } from "@faker-js/faker";
import { Logger } from "@nestjs/common";
import {
	AccountRole,
	BmiStatus,
	DietGoal,
	DietPlan,
	Gender,
	PatientActivity,
	PrismaClient,
} from "@prisma/client";
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

		const height = Math.floor(Math.random() * 200) + 120;
		const weight = Math.floor(Math.random() * 100) + 40;

		const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(2);

		const dateOfBirth = faker.date.past({
			years: 20,
		});

		const age = new Date().getFullYear() - dateOfBirth.getFullYear();

		await prisma.patientDetail.create({
			data: {
				medicalRecordKey: {
					connect: {
						id: medicalRecordKey.id,
					},
				},
				activityLevel: PatientActivity.SEDENTARY,
				anthropometric: {
					create: {
						bmi: bmi,
						height: height,
						weight: weight,
						bmiStatus: BmiStatus.NORMAL,
					},
				},
				name: "John Doe",
				gender: Gender.MALE,
				dateOfBirth: dateOfBirth,
				age: age,
				nutritionCarePlan: {
					create: {
						dietGoal: DietGoal.MAINTAIN,
						dietPlan: DietPlan.MAINTAIN,
						dietPlanDescription: "Maintain weight",
					},
				},
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
				code: true,
			},
		});

		for (const key of dummyMedicalRecordKeys) {
			const email = faker.internet.email();

			const name = faker.person.fullName();

			const _height = Math.floor(Math.random() * 200) + 120;
			const _weight = Math.floor(Math.random() * 100) + 40;

			const _bmi = +(weight / Math.pow(height / 100, 2)).toFixed(2);

			const _dateOfBirth = faker.date.past({
				years: 20,
			});

			const _age = new Date().getFullYear() - dateOfBirth.getFullYear();

			await prisma.patientDetail.create({
				data: {
					medicalRecordKey: {
						connect: {
							id: key.id,
						},
					},
					activityLevel: PatientActivity.SEDENTARY,
					anthropometric: {
						create: {
							bmi: _bmi,
							height: _height,
							weight: _weight,
							bmiStatus: BmiStatus.NORMAL,
						},
					},
					name: name,
					gender: Gender.MALE,
					dateOfBirth: _dateOfBirth,
					age: _age,
					nutritionCarePlan: {
						create: {
							dietGoal: DietGoal.MAINTAIN,
							dietPlan: DietPlan.MAINTAIN,
							dietPlanDescription: "Maintain weight",
						},
					},
				},
			});

			await prisma.patient.create({
				data: {
					medicalRecordKey: {
						connect: {
							id: key.id,
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
							name: name,
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
