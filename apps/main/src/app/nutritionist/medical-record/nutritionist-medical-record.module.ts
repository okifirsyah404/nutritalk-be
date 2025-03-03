import { Module } from "@nestjs/common";
import { NutritionistMedicalRecordKeyService } from "./service/nutritionist-medical-record-key.service";
import { NutritionistMedicalRecordKeyController } from "./controller/nutritionist-medical-record-key.controller";
import { NutritionistMedicalRecordKeyRepository } from "@app/app/nutritionist/medical-record/repository/nutritionist-medical-record-key.repository";

@Module({
	controllers: [NutritionistMedicalRecordKeyController],
	providers: [
		NutritionistMedicalRecordKeyService,
		NutritionistMedicalRecordKeyRepository,
	],
})
export class NutritionistMedicalRecordModule {}
