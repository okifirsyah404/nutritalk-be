import { Controller } from "@nestjs/common";
import { NutritionistProfileService } from "./nutritionist-profile.service";

@Controller("nutritionist-profile")
export class NutritionistProfileController {
	constructor(
		private readonly nutritionistProfileService: NutritionistProfileService,
	) {}
}
