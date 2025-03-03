import { PrismaModule } from "@config/prisma";
import { Module } from "@nestjs/common";
import { BmiService } from "./provider/bmi.service";
import { BmiRepository } from "./repository/bmi.repository";

@Module({
	imports: [
		PrismaModule.forRoot({
			logs: false,
		}),
	],
	providers: [BmiService, BmiRepository],
	exports: [BmiService],
})
export class BmiModule {}
