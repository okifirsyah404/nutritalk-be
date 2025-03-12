import { Module } from "@nestjs/common";
import { PatientDashboardController } from "./controller/patient-dashboard.controller";
import { PatientDashboardRepository } from "./repository/patient-dashboard.repository";
import { PatientDashboardService } from "./service/patient-dashboard.service";

@Module({
	controllers: [PatientDashboardController],
	providers: [PatientDashboardService, PatientDashboardRepository],
})
export class PatientDashboardModule {}
