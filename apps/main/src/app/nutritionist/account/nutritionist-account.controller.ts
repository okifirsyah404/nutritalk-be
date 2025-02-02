import { Controller } from "@nestjs/common";
import { NutritionistAccountService } from "./nutritionist-account.service";

@Controller("nutritionist-account")
export class NutritionistAccountController {
	constructor(
		private readonly nutritionistAccountService: NutritionistAccountService,
	) {}
}
