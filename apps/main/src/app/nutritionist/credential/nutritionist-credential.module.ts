import { Module } from "@nestjs/common";
import { NutritionistCredentialController } from "./controller/nutritionist-credential.controller";
import { NutritionistCredentialRepository } from "./repository/nutritionist-credential.repository";
import { NutritionistCredentialService } from "./service/nutritionist-credential.service";

@Module({
	controllers: [NutritionistCredentialController],
	providers: [NutritionistCredentialService, NutritionistCredentialRepository],
})
export class NutritionistCredentialModule {}
