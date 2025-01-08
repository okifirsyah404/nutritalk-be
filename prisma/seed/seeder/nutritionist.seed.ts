import {
	DayOfWeek,
	Gender,
	NutritionistType,
	Prisma,
	PrismaClient,
	Role,
} from "@prisma/client";
import { hashPassword } from "../helper/crypto-helper";

import * as nutritionistRawData from "../raw/nutritionist.json";
import * as priceRawData from "../raw/price.json";
import * as scheduleHoursRawData from "../raw/schedule-hour.json";

async function seedNutritionist(prisma: PrismaClient): Promise<void> {
	const nutritionistPrice: Prisma.PriceCreateInput = {
		online: priceRawData.online,
		offline: priceRawData.offline,
	};

	const workHours: Prisma.ScheduleTimeCreateInput[] = [
		{
			start: new Date(scheduleHoursRawData.morning.start),
			end: new Date(scheduleHoursRawData.morning.end),
			active: true,
		},
		{
			start: new Date(scheduleHoursRawData.noon.start),
			end: new Date(scheduleHoursRawData.noon.end),
			active: true,
		},
	];

	const nutritionistData = nutritionistRawData.data;

	try {
		console.log(
			"------------- Deleting all nutritionist data... -------------",
		);

		await prisma.profile.deleteMany({
			where: {
				nutritionist: {
					account: {
						roles: {
							role: Role.NUTRITIONIST,
						},
					},
				},
			},
		});

		await prisma.account.deleteMany({
			where: {
				roles: {
					role: Role.NUTRITIONIST,
				},
			},
		});

		await prisma.nutritionist.deleteMany();

		console.log("------------- Deleted all nutritionist data -------------");
		console.log("------------- Seeding nutritionist accounts... -------------");

		const permission = await prisma.basePermission.findMany({
			where: {
				key: {
					contains: "NUTRITIONIST_SELF",
				},
			},
		});

		for await (const [index, nutritionist] of nutritionistData.entries()) {
			if (process.env.NODE_ENV === "production" && index === 0) {
				console.log("Skip seeding dummy nutritionist data for development");
				continue;
			}

			await prisma.account.create({
				data: {
					email: nutritionist.email,
					password: await hashPassword(nutritionist.email),
					roles: {
						create: {
							role: Role.NUTRITIONIST,
							permissions: {
								createMany: {
									skipDuplicates: true,
									data: permission.map((p) => ({
										basePermissionId: p.id,
										isPermitted: true,
									})),
								},
							},
						},
					},
					nutritionist: {
						create: {
							nidn: nutritionist.nidn,
							nip: nutritionist.nip,
							type: NutritionistType.COUNSELOR,
							price: {
								create: nutritionistPrice,
							},
							profile: {
								create: {
									name: nutritionist.name,
									gender: Gender[nutritionist.gender],
									phoneNumber: nutritionist.phone,
									address: nutritionist.address,
								},
							},
							occupation: {
								create: {
									name: nutritionist.work,
									workPlace: nutritionist.workPlace,
									experience: nutritionist.experience,
								},
							},
							registrationCertificate:
								nutritionist.registrationNumber !== null
									? {
											create: {
												registrationNumber: nutritionist.registrationNumber,
											},
										}
									: undefined,
							schedules: {
								create: [
									{
										dayOfWeek: DayOfWeek[nutritionist.dayOfWeek],
										dayOfWeekIndex: nutritionist.dayOfWeekIndex,
										scheduleTimes: {
											create: workHours,
										},
									},
								],
							},
							consultationMeta: {
								create: {
									avgRating: 0,
									successConsultation: 0,
									consultation: 0,
								},
							},
						},
					},
				},
			});

			new Promise((resolve) => {
				setTimeout(resolve, 500);
			});
		}

		console.log("------------- Seed nutritionist complete -------------");
	} catch (error) {
		console.error(
			"------------- There's an error when seeding nutritionist data -------------",
		);
		throw error;
	}
}

export default seedNutritionist;
