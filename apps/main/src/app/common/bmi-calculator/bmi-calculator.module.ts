import { Module } from "@nestjs/common";
import { BmiCalculatorService } from "./service/bmi-calculator.service";
import { BmiCalculatorController } from "./controller/bmi-calculator.controller";
import { BmiModule } from "@module/bmi";

@Module({
	imports: [BmiModule],
	controllers: [BmiCalculatorController],
	providers: [BmiCalculatorService],
})
export class BmiCalculatorModule {}
