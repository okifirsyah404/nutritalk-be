import { faker } from "@faker-js/faker";
import { Logger } from "@nestjs/common";
import {
	ConsultationType,
	PrismaClient,
	TransactionStatus,
} from "@prisma/client";

async function seedTransaction(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("TransactionSeeder");

	if (process.env.NODE_ENV === "production") {
		logger.log("Skipping transaction seed in production...");
		return;
	}

	try {
		logger.log("Deleting all transaction data...");

		await prisma.transaction.deleteMany();

		logger.log("Deleted all transaction data");
		logger.log("Seeding transaction data...");

		const patient = await prisma.patient.findFirst({
			where: {
				account: {
					email: "johndoe@example.com",
				},
			},
			select: {
				id: true,
			},
		});

		const nutritionist = await prisma.nutritionist.findFirst({
			where: {
				account: {
					email: "devnutritionist@local.com",
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
				transactionId: string | null;
				rating: number;
				description: string | null;
			};
		}[] = [];

		for (let i = 0; i < 30; i++) {
			const date = new Date();

			const status: TransactionStatus = randomEnum(TransactionStatus);

			const tr = await prisma.transaction.create({
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
					note: faker.lorem.sentence(),
					consultationTime: {
						create: {
							start: date,
							end: new Date(date.setHours(date.getHours() + 1)),
						},
					},
					transactionPayment: {
						create: {
							code: faker.string.alphanumeric(12),
							date: date,
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

		logger.log("Seed transaction complete");
	} catch (error) {
		logger.error("There's an error when seeding transaction");

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

export default seedTransaction;
