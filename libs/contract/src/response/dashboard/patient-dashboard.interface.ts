import {
	IConsultationEntity,
	ICreditEntity,
	IPatientEntity,
} from "@contract/entities/prisma.entity.interface";

export interface IPatientDashboardConsultationResponse {
	pendingConsultations: IConsultationEntity[];
	ongoingConsultations: IConsultationEntity[];
	finishedConsultations: IConsultationEntity[];
}

export interface IPatientDashboardResponse
	extends IPatientDashboardConsultationResponse {
	patient: IPatientEntity;
	credit: ICreditEntity;
	consultationCount: number;
}
