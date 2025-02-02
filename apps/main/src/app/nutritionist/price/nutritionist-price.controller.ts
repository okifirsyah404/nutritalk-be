import { Controller } from "@nestjs/common";
import { NutritionistPriceService } from "./nutritionist-price.service";

@Controller("nutritionist-price")
export class NutritionistPriceController {
	constructor(
		private readonly nutritionistPriceService: NutritionistPriceService,
	) {}
}
