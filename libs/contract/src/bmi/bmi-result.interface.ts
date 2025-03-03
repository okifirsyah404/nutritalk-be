import { BmiStatus } from "@prisma/client";

export interface IBMIResult {
	bmi: number;
	status: BmiStatus;
}
