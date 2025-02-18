import { Module } from "@nestjs/common";
import { NutritionistProfileController } from "./controller/nutritionist-profile.controller";
import { NutritionistProfileRepository } from "./repository/nutritionist-profile.repository";
import { NutritionistProfileService } from "./service/nutritionist-profile.service";

@Module({
	controllers: [NutritionistProfileController],
	providers: [NutritionistProfileService, NutritionistProfileRepository],
})
export class NutritionistProfileModule {}
