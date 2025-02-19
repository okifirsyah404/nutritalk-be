import { Module } from "@nestjs/common";
import { SignatureSchedulerRepository } from "./repository/signature-scheduler.repository";
import { SignatureSchedulerService } from "./service/signature-scheduler.service";

@Module({
	providers: [SignatureSchedulerService, SignatureSchedulerRepository],
	exports: [SignatureSchedulerService],
})
export class SignatureSchedulerModule {}
