import { Module } from "@nestjs/common";
import { NutritionistOccupationController } from "./controller/nutritionist-occupation.controller";
import { NutritionistOccupationRepository } from "./repository/nutritionist-occupation.repository";
import { NutritionistOccupationService } from "./service/nutritionist-occupation.service";

@Module({
	controllers: [NutritionistOccupationController],
	providers: [NutritionistOccupationService, NutritionistOccupationRepository],
})
export class NutritionistOccupationModule {}
