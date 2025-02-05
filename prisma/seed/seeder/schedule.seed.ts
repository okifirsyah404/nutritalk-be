import { Logger } from "@nestjs/common";
import { DayOfWeek, PrismaClient } from "@prisma/client";

export async function seedSchedule(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("ScheduleSeeder");

	const daysOfWeekArr: DayOfWeek[] = [
		DayOfWeek.MONDAY,
		DayOfWeek.TUESDAY,
		DayOfWeek.WEDNESDAY,
		DayOfWeek.THURSDAY,
		DayOfWeek.FRIDAY,
		DayOfWeek.SATURDAY,
		DayOfWeek.SUNDAY,
	];

	try {
		logger.log("Seeding schedule data...");

		const nutritionists = await prisma.nutritionist.findMany();

		for (const nutritionist of nutritionists) {
			const nutritionistId = nutritionist.id;

			for (const dayOfWeek of daysOfWeekArr) {
				await prisma.schedule.upsert({
					where: {
						nutritionistId_dayOfWeek: {
							nutritionistId: nutritionistId,
							dayOfWeek: dayOfWeek,
						},
					},
					update: {}, // Leave empty to skip updating if it exists
					create: {
						dayOfWeek: dayOfWeek,
						active: false,
						dayOfWeekIndex: daysOfWeekArr.indexOf(dayOfWeek) + 1,
						scheduleTimes: {
							create: [
								{
									start: new Date("1970-01-01T01:00:00Z"),
									end: new Date("1970-01-01T04:00:00Z"),
								},
								{
									start: new Date("1970-01-01T06:00:00Z"),
									end: new Date("1970-01-01T10:00:00Z"),
								},
							],
						},
						nutritionistId: nutritionistId,
					},
				});
			}
		}

		logger.log("Seeding schedule data completed");
	} catch (error) {
		logger.error("There's an error when seeding patient data");
		throw error;
	}
}
