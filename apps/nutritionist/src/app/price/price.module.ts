import { Module } from "@nestjs/common";
import { PriceController } from "./controller/price.controller";
import { PriceRepository } from "./repository/price.repository";
import { PriceService } from "./service/price.service";

@Module({
	controllers: [PriceController],
	providers: [PriceService, PriceRepository],
})
export class PriceModule {}
