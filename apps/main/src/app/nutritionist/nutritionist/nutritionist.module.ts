import { Module } from "@nestjs/common";
import { NutritionistController } from "./controller/nutritionist.controller";
import { NutritionistRepository } from "./repository/nutritionist.repository";
import { NutritionistService } from "./service/nutritionist.service";

@Module({
	controllers: [NutritionistController],
	providers: [NutritionistService, NutritionistRepository],
})
export class NutritionistModule {}
