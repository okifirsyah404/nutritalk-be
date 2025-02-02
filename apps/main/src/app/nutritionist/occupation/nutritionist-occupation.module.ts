import { Module } from "@nestjs/common";
import { NutritionistOccupationService } from "./nutritionist-occupation.service";
import { NutritionistOccupationController } from "./nutritionist-occupation.controller";

@Module({
	controllers: [NutritionistOccupationController],
	providers: [NutritionistOccupationService],
})
export class NutritionistOccupationModule {}
