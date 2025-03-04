import { IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { MedicalRecordValidationMessage } from "@constant/message";

export class CommonBmiCalculateRequest {
	@Min(30, {
		message: MedicalRecordValidationMessage.ERR_WEIGHT_MIN_30,
	})
	@Max(150, {
		message: MedicalRecordValidationMessage.ERR_WEIGHT_MAX_150,
	})
	@IsInt({
		message: MedicalRecordValidationMessage.ERR_WEIGHT_MUST_BE_NUMBER,
	})
	@IsNotEmpty({
		message: MedicalRecordValidationMessage.ERR_WEIGHT_REQUIRED,
	})
	weight: number;

	@Max(300, {
		message: MedicalRecordValidationMessage.ERR_HEIGHT_MAX_300,
	})
	@Min(100, {
		message: MedicalRecordValidationMessage.ERR_HEIGHT_MIN_100,
	})
	@IsInt({
		message: MedicalRecordValidationMessage.ERR_HEIGHT_MUST_BE_NUMBER,
	})
	@IsNotEmpty({
		message: MedicalRecordValidationMessage.ERR_HEIGHT_REQUIRED,
	})
	height: number;
}
