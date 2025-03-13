import { SetCache } from "@config/app-cache";
import { AppS3StorageService } from "@config/s3storage";
import { PatientErrorMessage } from "@constant/message";
import { IPatientDashboardResponse } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientDashboardRepository } from "../repository/patient-dashboard.repository";

@Injectable()
export class PatientDashboardService {
	constructor(
		private readonly repository: PatientDashboardRepository,
		private readonly s3Service: AppS3StorageService,
	) {}

	/**
	 *
	 * Get the patient dashboard.
	 *
	 * @param patientId - The id of the patient.
	 * @returns The patient dashboard response.
	 *
	 */
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

		const ongoingConsultations = await Promise.all(
			consultations.ongoingConsultations.map(async (consultation) => ({
				...consultation,
				nutritionist: {
					...consultation.nutritionist,
					profile: await this.s3Service.getProfileSignedUrl(
						consultation.nutritionist.profile,
					),
				},
			})),
		);

		const pendingConsultations = await Promise.all(
			consultations.pendingConsultations.map(async (consultation) => ({
				...consultation,
				nutritionist: {
					...consultation.nutritionist,
					profile: await this.s3Service.getProfileSignedUrl(
						consultation.nutritionist.profile,
					),
				},
			})),
		);

		const finishedConsultations = await Promise.all(
			consultations.finishedConsultations.map(async (consultation) => ({
				...consultation,
				nutritionist: {
					...consultation.nutritionist,
					profile: await this.s3Service.getProfileSignedUrl(
						consultation.nutritionist.profile,
					),
				},
			})),
		);

		return {
			patient: {
				...patient,
				profile: await this.s3Service.getProfileSignedUrl(patient.profile),
				credit: undefined,
			},
			credit: patient.credit,
			consultationCount,
			ongoingConsultations,
			pendingConsultations,
			finishedConsultations,
		};
	}
}
