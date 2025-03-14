import { PatientErrorMessage } from "@constant/message";
import { ICreditEntity } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientCreditRepository } from "../repository/patient-credit.repository";

@Injectable()
export class PatientCreditService {
	constructor(private readonly repostiory: PatientCreditRepository) {}

	async getCreditByPatientId(patientId: string): Promise<ICreditEntity> {
		const credit = await this.repostiory.findCreditByPatientId(patientId);

		if (!credit) {
			throw new NotFoundException(PatientErrorMessage.ERR_CREDIT_NOT_FOUND);
		}

		return credit;
	}
}
