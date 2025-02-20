import { Module } from "@nestjs/common";
import { NutritionistController } from "./controller/nutritionist.controller";
import { NutritionistRepository } from "./repository/nutritionist.repository";
import { NutritionistService } from "./service/nutritionist.service";
import { PublicNutritionistController } from "@app/app/nutritionist/nutritionist/controller/public-nutritionist.controller";
import { PublicNutritionistService } from "@app/app/nutritionist/nutritionist/service/public-nutritionist.service";
import { PublicNutritionistRepository } from "@app/app/nutritionist/nutritionist/repository/public-nutritionist.repository";

@Module({
	controllers: [NutritionistController, PublicNutritionistController],
	providers: [
		NutritionistService,
		PublicNutritionistService,
		NutritionistRepository,
		PublicNutritionistRepository,
	],
})
export class NutritionistModule {}
