import { IBMIResult } from "@contract";
import { BmiStatus } from "@prisma/client";

export class CommonBmiResultResponse implements IBMIResult {
	private constructor(entity: IBMIResult) {
		this.bmi = entity.bmi;
		this.status = entity.status;
	}

	bmi: number;
	status: BmiStatus;

	static fromEntity(entity: IBMIResult): CommonBmiResultResponse {
		return new CommonBmiResultResponse(entity);
	}
}
