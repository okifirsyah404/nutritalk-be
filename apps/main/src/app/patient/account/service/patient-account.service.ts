import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientAccountRepository } from "@app/app/patient/account/repository/patient-account.repository";
import { AccountErrorMessage } from "@constant/message";
import { IAccountEntity } from "@contract";

@Injectable()
export class PatientAccountService {
	constructor(private readonly repository: PatientAccountRepository) {}

	/**
	 * Retrieves the account information associated with a given patient ID.
	 *
	 * @param patientId - The unique identifier of the patient.
	 * @returns A promise that resolves to the account entity associated with the given patient ID.
	 */
	async getAccountByPatientId(patientId: string): Promise<IAccountEntity> {
		const result = await this.repository.findAccountByPatientId(patientId);

		if (!result) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		return result;
	}
}
