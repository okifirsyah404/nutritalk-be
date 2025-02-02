import { Module } from "@nestjs/common";
import { NutritionistService } from "./nutritionist.service";
import { NutritionistController } from "./nutritionist.controller";

@Module({
	controllers: [NutritionistController],
	providers: [NutritionistService],
})
export class NutritionistModule {}
