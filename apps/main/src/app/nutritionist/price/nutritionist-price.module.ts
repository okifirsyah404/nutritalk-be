import { Module } from "@nestjs/common";
import { NutritionistPriceService } from "./nutritionist-price.service";
import { NutritionistPriceController } from "./nutritionist-price.controller";

@Module({
	controllers: [NutritionistPriceController],
	providers: [NutritionistPriceService],
})
export class NutritionistPriceModule {}
