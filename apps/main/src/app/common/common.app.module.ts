import { Module } from "@nestjs/common";
import { BmiCalculatorModule } from "./bmi-calculator/bmi-calculator.module";
import { MidtransNotificationModule } from "./midtrans-notification/midtrans-notification.module";

@Module({
	imports: [BmiCalculatorModule, MidtransNotificationModule],
})
export class CommonAppModule {}
