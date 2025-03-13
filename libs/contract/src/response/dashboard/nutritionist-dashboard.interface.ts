import {
	IConsultationEntity,
	INutritionistEntity,
} from "@contract/entities/prisma.entity.interface";
import { INutritionistDashboardMeta } from "./nutritionist-dashboard-meta.interface";

export interface INutritionistDashboardConsultationResponse {
	ongoingConsultations: IConsultationEntity[];
	scheduledConsultations: IConsultationEntity[];
	waitingConfirmConsultations: IConsultationEntity[];
	finishedConsultations: IConsultationEntity[];
}

export interface INutritionistDashboardResponse
	extends INutritionistDashboardConsultationResponse {
	nutritionist: INutritionistEntity;
	dashboardMeta: INutritionistDashboardMeta;
}
