import { Body, Controller, Post } from "@nestjs/common";
import { BmiCalculatorService } from "../service/bmi-calculator.service";
import { BaseApiResponse } from "@common";
import { CommonBmiResultResponse } from "@app/app/common/bmi-calculator/dto/response/common-bmi-result.response";
import { CommonBmiCalculateRequest } from "@app/app/common/bmi-calculator/dto/request/common-bmi-calculate.request";
import { MedicalRecordSuccessMessage } from "@constant/message";

@Controller("common/bmi-calculator")
export class BmiCalculatorController {
	constructor(private readonly service: BmiCalculatorService) {}

	@Post()
	async calculateBmi(
		@Body() reqBody: CommonBmiCalculateRequest,
	): Promise<BaseApiResponse<CommonBmiResultResponse>> {
		const result = await this.service.calculateBmi(
			reqBody.weight,
			reqBody.height,
		);

		return BaseApiResponse.created({
			message: MedicalRecordSuccessMessage.SUCCESS_CALCULATE_BMI,
			data: CommonBmiResultResponse.fromEntity(result),
		});
	}
}
