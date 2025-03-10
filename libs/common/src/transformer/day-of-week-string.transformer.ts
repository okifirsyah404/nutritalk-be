import { DayOfWeek } from "@prisma/client";

export const dayOfWeekStringTransformer = ({
	value,
}: {
	value: string;
}): DayOfWeek | undefined => {
	switch (value.toLowerCase()) {
		case "sunday":
			return DayOfWeek.SUNDAY;
		case "monday":
			return DayOfWeek.MONDAY;
		case "tuesday":
			return DayOfWeek.TUESDAY;
		case "wednesday":
			return DayOfWeek.WEDNESDAY;
		case "thursday":
			return DayOfWeek.THURSDAY;
		case "friday":
			return DayOfWeek.FRIDAY;
		case "saturday":
			return DayOfWeek.SATURDAY;
		default:
			return undefined;
	}
};
