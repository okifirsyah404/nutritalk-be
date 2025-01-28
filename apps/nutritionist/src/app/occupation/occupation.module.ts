import { Module } from "@nestjs/common";
import { OccupationController } from "./controller/occupation.controller";
import { OccupationRepository } from "./repository/occupation.repository";
import { OccupationService } from "./service/occupation.service";

@Module({
	controllers: [OccupationController],
	providers: [OccupationService, OccupationRepository],
})
export class OccupationModule {}
