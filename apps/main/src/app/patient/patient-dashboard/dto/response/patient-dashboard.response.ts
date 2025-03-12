import {
	IConsultationEntity,
	ICreditEntity,
	IPatientDashboardResponse,
	IPatientEntity,
} from "@contract";

export class PatientDashboardResponse implements IPatientDashboardResponse {
	private constructor(entity: IPatientDashboardResponse) {
		this.patient = entity.patient;
		this.credit = entity.credit;
		this.consultationCount = entity.consultationCount;
		this.ongoingConsultations = entity.ongoingConsultations;
		this.pendingConsultations = entity.pendingConsultations;
		this.finishedConsultations = entity.finishedConsultations;
	}

	patient: IPatientEntity;
	credit: ICreditEntity;
	consultationCount: number;
	ongoingConsultations: IConsultationEntity[];
	pendingConsultations: IConsultationEntity[];
	finishedConsultations: IConsultationEntity[];

	static fromEntity(
		entity: IPatientDashboardResponse,
	): PatientDashboardResponse {
		return new PatientDashboardResponse(entity);
	}
}
