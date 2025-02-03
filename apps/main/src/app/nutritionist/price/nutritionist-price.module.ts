import { Module } from "@nestjs/common";
import { NutritionistPriceController } from "./controller/nutritionist-price.controller";
import { NutritionistPriceRepository } from "./repository/nutritionist-price.repository";
import { NutritionistPriceService } from "./service/nutritionist-price.service";

@Module({
	controllers: [NutritionistPriceController],
	providers: [NutritionistPriceService, NutritionistPriceRepository],
})
export class NutritionistPriceModule {}
