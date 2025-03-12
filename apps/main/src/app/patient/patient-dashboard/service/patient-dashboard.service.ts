import { SetCache } from "@config/app-cache";
import { PatientErrorMessage } from "@constant/message";
import { IPatientDashboardResponse } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientDashboardRepository } from "../repository/patient-dashboard.repository";

@Injectable()
export class PatientDashboardService {
	constructor(private readonly repository: PatientDashboardRepository) {}

	@SetCache((patientId: string) => `patient-dashboard-${patientId}`, {
		ttl: 1,
		unit: "minute",
	})
	async getPatientDashboard(
		patientId: string,
	): Promise<IPatientDashboardResponse> {
		const patient = await this.repository.findPatientById(patientId);

		if (!patient) {
			throw new NotFoundException(PatientErrorMessage.ERR_PATIENT_NOT_FOUND);
		}

		const consultationCount =
			await this.repository.countFinishedConsultationsByPatientId(patientId);

		const consultations =
			await this.repository.findConsultationsByPatientId(patientId);

		return {
			patient: {
				...patient,
				credit: undefined,
			},
			credit: patient.credit,
			consultationCount,
			ongoingConsultations: consultations.ongoingConsultations,
			pendingConsultations: consultations.pendingConsultations,
			finishedConsultations: consultations.finishedConsultations,
		};
	}
}
