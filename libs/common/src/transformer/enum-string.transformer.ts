import { ConsultationType, DayOfWeek, Gender } from "@prisma/client";

export const genderEnumStringTransformer = ({
	value,
}: {
	value: string;
}): Gender | undefined => {
	if (value.toLowerCase() === Gender.MALE.toLowerCase()) return Gender.MALE;
	if (value.toLowerCase() === Gender.FEMALE.toLowerCase()) return Gender.FEMALE;

	return undefined;
};

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

export const consultationTypeEnumStringTransformer = ({
	value,
}: {
	value: string;
}): ConsultationType | undefined => {
	if (value.toLowerCase() === ConsultationType.ONLINE.toLowerCase())
		return ConsultationType.ONLINE;
	if (value.toLowerCase() === ConsultationType.OFFLINE.toLowerCase())
		return ConsultationType.OFFLINE;

	return undefined;
};
