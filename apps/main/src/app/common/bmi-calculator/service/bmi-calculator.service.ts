import { Injectable } from "@nestjs/common";
import { BmiService } from "@module/bmi";
import { IBMIResult } from "@contract";

@Injectable()
export class BmiCalculatorService {
	constructor(private readonly bmiService: BmiService) {}

	async calculateBmi(weight: number, height: number): Promise<IBMIResult> {
		return await this.bmiService.getResult({
			height,
			weight,
		});
	}
}
