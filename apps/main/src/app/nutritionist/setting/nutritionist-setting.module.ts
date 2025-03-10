import { Module } from "@nestjs/common";
import { NutritionistSettingController } from "./controller/nutritionist-setting.controller";
import { NutritionistSettingRepository } from "./repository/nutritionist-setting.repository";
import { NutritionistSettingService } from "./service/nutritionist-setting.service";

@Module({
	controllers: [NutritionistSettingController],
	providers: [NutritionistSettingService, NutritionistSettingRepository],
})
export class NutritionistSettingModule {}
