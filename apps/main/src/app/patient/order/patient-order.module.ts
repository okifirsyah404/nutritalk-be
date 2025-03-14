import { Module } from "@nestjs/common";
import { PatientOrderController } from "./controller/patient-order.controller";
import { PatientOrderRepository } from "./repository/patient-order.repository";
import { PatientOrderService } from "./service/patient-order.service";

@Module({
	controllers: [PatientOrderController],
	providers: [PatientOrderService, PatientOrderRepository],
})
export class PatientOrderModule {}
