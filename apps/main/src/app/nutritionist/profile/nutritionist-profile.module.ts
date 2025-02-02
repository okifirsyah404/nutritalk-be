import { Module } from "@nestjs/common";
import { NutritionistProfileService } from "./nutritionist-profile.service";
import { NutritionistProfileController } from "./nutritionist-profile.controller";

@Module({
	controllers: [NutritionistProfileController],
	providers: [NutritionistProfileService],
})
export class NutritionistProfileModule {}
