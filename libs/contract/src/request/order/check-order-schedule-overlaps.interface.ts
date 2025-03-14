import { ConsultationType } from "@prisma/client";

export interface ICheckOrderScheduleOverlaps {
	nutritionistId: string;
	start: Date;
	end: Date;
	type?: ConsultationType;
}
