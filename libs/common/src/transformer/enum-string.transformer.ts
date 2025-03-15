import { ConsultationType, DayOfWeek, Gender } from "@prisma/client";
import { MidtransTransactionStatus } from "@contract";

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

export const midtransTransactionStatusEnumStringTransformer = ({
	value,
}: {
	value: string;
}): MidtransTransactionStatus | undefined => {
	switch (value.toLowerCase()) {
		case "authorize":
			return MidtransTransactionStatus.AUTHORIZE;
		case "capture":
			return MidtransTransactionStatus.CAPTURE;
		case "pending":
			return MidtransTransactionStatus.PENDING;
		case "settlement":
			return MidtransTransactionStatus.SETTLEMENT;
		case "deny":
			return MidtransTransactionStatus.DENY;
		case "expire":
			return MidtransTransactionStatus.EXPIRE;
		case "cancel":
			return MidtransTransactionStatus.CANCEL;
		case "refund":
			return MidtransTransactionStatus.REFUND;
		case "partial_refund":
			return MidtransTransactionStatus.PARTIAL_REFUND;
		case "chargeback":
			return MidtransTransactionStatus.CHARGEBACK;
		case "partial_chargeback":
			return MidtransTransactionStatus.PARTIAL_CHARGEBACK;
		case "failure":
			return MidtransTransactionStatus.FAILURE;
		default:
			return undefined;
	}

	return undefined;
};
