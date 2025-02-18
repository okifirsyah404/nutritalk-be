import { Controller } from "@nestjs/common";
import { NutritionistConsultationService } from "./nutritionist-consultation.service";

@Controller("nutritionist-consultation")
export class NutritionistConsultationController {
	constructor(
		private readonly nutritionistConsultationService: NutritionistConsultationService,
	) {}
}
