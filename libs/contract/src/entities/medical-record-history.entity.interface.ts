import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IAnthropometricEntity } from "./anthropometric.entity.interface";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationEntity } from "./consultation.entity.interface";
import { IDietaryAssessmentEntity } from "./dietary-assessment.entity.interface";
import { IGastrointestinalRecordEntity } from "./gastrointestinal-record.entitiy.interface";
import { IMedicalRecordKeyEntity } from "./medical-record-key.entity.interface";

export interface IMedicalRecordHistoryEntity
	extends IBaseEntity,
		Prisma.MedicalRecordHistoryGetPayload<{
			select: (typeof PrismaSelector)["MEDICAL_RECORD_HISTORY"];
		}> {
	anthropometric: IAnthropometricEntity;
	dietaryAssessment: IDietaryAssessmentEntity;
	gastrointestinalRecord: IGastrointestinalRecordEntity;
	medicalRecordKey?: IMedicalRecordKeyEntity;
	consultation?: IConsultationEntity;
	medicalRecordKeyId?: string;
	anthropometricId?: string;
	dietaryAssessmentId?: string;
	gastrointestinalRecordId?: string;
	consultationId?: string;
}
