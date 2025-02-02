import { Controller } from "@nestjs/common";
import { NutritionistService } from "./nutritionist.service";

@Controller("nutritionist")
export class NutritionistController {
	constructor(private readonly nutritionistService: NutritionistService) {}
}
