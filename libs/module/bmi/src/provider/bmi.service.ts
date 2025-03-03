import { IBMIParam, IBMIResult } from "@contract";
import { Injectable } from "@nestjs/common";
import { BmiRepository } from "../repository/bmi.repository";

@Injectable()
export class BmiService {
	constructor(private readonly repository: BmiRepository) {}

	calculate(data: IBMIParam): number {
		return +(data.weight / Math.pow(data.height / 100, 2)).toFixed(2);
	}

	async getResult(data: IBMIParam): Promise<IBMIResult> {
		const bmi = this.calculate(data);
		const limit = await this.repository.getBmiLimitByValue(bmi);

		return {
			bmi,
			status: limit.status,
		};
	}
}
