/* eslint-disable @typescript-eslint/no-unsafe-return */

import { faker } from "@faker-js/faker";
import { Logger } from "@nestjs/common";
import {
	BmiStatus,
	ConsultationType,
	PrismaClient,
	TransactionStatus,
} from "@prisma/client";
import moment from "moment-timezone";

async function seedConsultation(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("ConsultationSeeder");

	if (process.env.NODE_ENV === "production") {
		logger.log("Skipping consultation seed in production...");
		return;
	}

	try {
		logger.log("Deleting all consultation data...");

		await prisma.consultation.deleteMany();

		logger.log("Deleted all consultation data");
		logger.log("Seeding consultation data...");

		const patient = await prisma.patient.findFirst({
			where: {
				account: {
					email: "dev@patient.com",
				},
			},
			select: {
				id: true,
				medicalRecordKey: true,
			},
		});

		const nutritionist = await prisma.nutritionist.findFirst({
			where: {
				account: {
					email: "dev@nutritionist.com",
				},
			},
			select: {
				id: true,
				price: true,
			},
		});

		const transactions: {
			id: string;
			status: TransactionStatus;
			consultationReview: {
				id: string;
				createdAt: Date | null;
				updatedAt: Date | null;
				consultationId: string | null;
				rating: number;
				description: string | null;
			};
		}[] = [];

		for (let i = 0; i < 100; i++) {
			const soonStartTime = moment(faker.date.soon({ days: 20 }))
				.tz("Asia/Jakarta")
				.set("hours", faker.number.int({ min: 7, max: 15 }));

			const soonEndTime = moment(soonStartTime)
				.add(faker.number.int({ min: 1, max: 3 }), "hours")
				.tz("Asia/Jakarta");

			const recentStartTime = moment(faker.date.recent({ days: 20 }))
				.tz("Asia/Jakarta")
				.set("hours", faker.number.int({ min: 7, max: 15 }));

			const recentEndTime = moment(recentStartTime)
				.add(faker.number.int({ min: 1, max: 3 }), "hours")
				.tz("Asia/Jakarta");

			const isRecent = faker.datatype.boolean();

			const status: TransactionStatus = randomEnum(TransactionStatus);

			const tr = await prisma.consultation.create({
				data: {
					patient: {
						connect: {
							id: patient.id,
						},
					},
					nutritionist: {
						connect: {
							id: nutritionist.id,
						},
					},
					type: randomEnum(ConsultationType),
					status: status,
					patientNote: faker.lorem.sentence(),
					nutritionistNote:
						status === TransactionStatus.FINISHED
							? faker.lorem.sentence()
							: null,
					consultationTime: {
						create: {
							start: isRecent
								? recentStartTime.toDate()
								: soonStartTime.toDate(),
							end: isRecent ? recentEndTime.toDate() : soonEndTime.toDate(),
						},
					},
					transactionPayment: {
						create: {
							code: faker.string.alphanumeric(12),
							date: soonStartTime.toDate(),
							method: "BANK_TRANSFER",
							status: "FINISHED",
						},
					},
					transactionPrice: {
						create: {
							price: nutritionist.price.online,
							subTotal: nutritionist.price.online,
							total: nutritionist.price.online,
						},
					},
					consultationReview:
						status === TransactionStatus.FINISHED
							? {
									create: {
										rating: faker.number.int({ min: 1, max: 5 }),
										description: faker.lorem.sentence(),
									},
								}
							: undefined,
					medicalRecordHistory: {
						create: {
							medicalRecordKey: {
								connect: {
									id: patient.medicalRecordKey.id,
								},
							},
							diagnosis: faker.lorem.sentence(),
							notes: faker.lorem.sentence(),
							others: faker.lorem.sentence(),
							dietaryAssessment: {
								create: {
									usualDiet: faker.lorem.sentence(),
									caloricIntake: faker.number.int({ min: 1000, max: 5000 }),
									proteinIntake: faker.number.int({ min: 50, max: 200 }),
									fatIntake: faker.number.int({ min: 50, max: 200 }),
									fiberIntake: faker.number.int({ min: 10, max: 50 }),
									carbohydrateIntake: faker.number.int({ min: 50, max: 200 }),
								},
							},
							anthropometric: {
								create: {
									bmi: faker.number.float({
										min: 10,
										max: 50,
										fractionDigits: 2,
									}),
									weight: faker.number.int({ min: 40, max: 200 }),
									height: faker.number.int({ min: 120, max: 200 }),
									bmiStatus: BmiStatus.NORMAL,
								},
							},
							gastrointestinalRecord: {
								create: {
									allergies: faker.lorem.sentence(),
									appetite: faker.lorem.sentence(),
								},
							},
						},
					},
				},
				select: {
					id: true,
					status: true,
					consultationReview: true,
				},
			});

			transactions.push(tr);
		}

		const avgRating: number =
			transactions.reduce(
				(acc, curr) => acc + (curr.consultationReview?.rating ?? 0),
				0,
			) / transactions.filter((tr) => tr.consultationReview !== null).length ||
			0;

		await prisma.consultationMeta.update({
			where: {
				nutritionistId: nutritionist.id,
			},
			data: {
				avgRating: checkAndRound(avgRating),
				successConsultation: transactions.filter(
					(tr) => tr.status === TransactionStatus.FINISHED,
				).length,
				consultation: transactions.filter(
					(tr) =>
						tr.status === TransactionStatus.FINISHED ||
						tr.status === TransactionStatus.ON_PROCESS,
				).length,
			},
		});

		logger.log("Seed consultation complete");
	} catch (error) {
		logger.error("There's an error when seeding consultation");

		throw error;
	}
}

function checkAndRound(number: number): number {
	if (Number.isInteger(number)) {
		return number;
	}
	return parseFloat(number.toFixed(2));
}

function randomEnum<T>(enumObj: T): T[keyof T] {
	const enumValues = Object.values(enumObj);
	const index = Math.floor(Math.random() * enumValues.length);

	return enumValues[index];
}

export default seedConsultation;
