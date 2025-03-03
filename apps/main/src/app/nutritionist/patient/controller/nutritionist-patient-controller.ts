import { Controller } from "@nestjs/common";
import { NutritionistPatientService } from "../service/nutritionist-patient.service";

@Controller("patient")
export class NutritionistPatientController {
	constructor(private readonly patientService: NutritionistPatientService) {}
}
