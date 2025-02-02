import { Controller } from "@nestjs/common";
import { NutritionistCertificateService } from "./nutritionist-certificate.service";

@Controller("nutritionist-certificate")
export class NutritionistCertificateController {
	constructor(
		private readonly nutritionistCertificateService: NutritionistCertificateService,
	) {}
}
