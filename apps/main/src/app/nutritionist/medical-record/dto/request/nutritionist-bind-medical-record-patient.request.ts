import { OmitType } from "@nestjs/swagger";
import { NutritionistCreateMedicalRecordKeyRequest } from "@app/app/nutritionist/medical-record/dto/request/nutritionist-create-medical-record-key.request";
import { IsNotEmpty, IsString } from "class-validator";
import { PatientValidationMessage } from "@constant/message";

export class NutritionistBindMedicalRecordPatientRequest extends OmitType(
	NutritionistCreateMedicalRecordKeyRequest,
	["patientId"],
) {
	@IsString({
		message: PatientValidationMessage.ERR_PATIENT_ID_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: PatientValidationMessage.ERR_PATIENT_ID_REQUIRED,
	})
	patientId: string;
}
