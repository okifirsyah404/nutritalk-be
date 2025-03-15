import { ICreateConsultationOrderRequest } from "@contract";
import { ConsultationType, PaymentSource } from "@prisma/client";
import { OmitType } from "@nestjs/swagger";
import { PatientCheckOrderScheduleOverlapsRequest } from "@app/app/patient/order/dto/request/patient-check-order-schedule-overlaps.request";
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";
import { ConsultationValidationMessage } from "@constant/message";

export class PatientCreateConsultationOrderRequest
	extends OmitType(PatientCheckOrderScheduleOverlapsRequest, ["type"])
	implements ICreateConsultationOrderRequest
{
	@IsNumber(
		{},
		{ message: ConsultationValidationMessage.ERR_DURATION_MUST_BE_NUMBER },
	)
	@IsNotEmpty({
		message: ConsultationValidationMessage.ERR_DURATION_REQUIRED,
	})
	duration: number;

	@IsString({
		message: ConsultationValidationMessage.ERR_PATIENT_NOTE_MUST_BE_STRING,
	})
	@IsOptional()
	patientNote?: string;

	@IsEnum(ConsultationType, {
		message: ConsultationValidationMessage.ERR_CONSULTATION_TYPE_MUST_BE_ENUM,
	})
	@IsNotEmpty({
		message: ConsultationValidationMessage.ERR_CONSULTATION_TYPE_REQUIRED,
	})
	type: ConsultationType;

	@IsEnum(PaymentSource, {
		message: ConsultationValidationMessage.ERR_PAYMENT_SOURCE_MUST_BE_ENUM,
	})
	@IsNotEmpty({
		message: ConsultationValidationMessage.ERR_PAYMENT_SOURCE_REQUIRED,
	})
	paymentSource: PaymentSource;
}
