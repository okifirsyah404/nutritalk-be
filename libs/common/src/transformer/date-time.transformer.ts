import { DateContent } from "@constant/content";
import moment from "moment";

export const dateTimeTransformer = ({
	value,
}: {
	value: string;
}): Date | undefined => {
	const date = moment(value);

	if (!date.isValid()) {
		return undefined;
	}

	return moment(DateContent.BASE_DATE)
		.set({
			hour: date.hour(),
			minute: date.minute(),
			second: date.second(),
			millisecond: date.millisecond(),
		})
		.toDate();
};
