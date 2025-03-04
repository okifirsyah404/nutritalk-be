import { Module } from "@nestjs/common";
import { BmiCalculatorModule } from "./bmi-calculator/bmi-calculator.module";

@Module({
	imports: [BmiCalculatorModule],
})
export class CommonAppModule {}
