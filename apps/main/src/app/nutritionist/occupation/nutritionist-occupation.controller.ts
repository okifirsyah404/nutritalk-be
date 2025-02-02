import { Controller } from "@nestjs/common";
import { NutritionistOccupationService } from "./nutritionist-occupation.service";

@Controller("nutritionist-occupation")
export class NutritionistOccupationController {
	constructor(
		private readonly nutritionistOccupationService: NutritionistOccupationService,
	) {}
}
