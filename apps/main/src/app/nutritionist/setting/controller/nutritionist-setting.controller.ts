import { BaseApiResponse } from "@common";
import { NutritionistSuccessMessage } from "@constant/message";
import { INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistUpdateSettingRequest } from "../dto/request/nutritionist-update-setting.request";
import { NutritionistSettingResponse } from "../dto/response/nutritionist-setting.response";
import { NutritionistSettingService } from "../service/nutritionist-setting.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "setting"))
export class NutritionistSettingController {
	constructor(private readonly service: NutritionistSettingService) {}

	@Get()
	async getNutritionistSetting(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<BaseApiResponse<NutritionistSettingResponse>> {
		const result = await this.service.getNutritionistSetting(nutritionist.id);

		return BaseApiResponse.success({
			message:
				NutritionistSuccessMessage.SUCCESS_GET_NUTRITIONIST_SYSTEM_SETTING,
			data: NutritionistSettingResponse.fromEntity(result),
		});
	}

	@Put()
	async updateNutritionistSetting(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistUpdateSettingRequest,
	): Promise<BaseApiResponse<NutritionistSettingResponse>> {
		const result = await this.service.updateNutritionistSetting(
			nutritionist.id,
			reqBody,
		);

		return BaseApiResponse.success({
			message:
				NutritionistSuccessMessage.SUCCESS_UPDATE_NUTRITIONIST_SYSTEM_SETTING,
			data: NutritionistSettingResponse.fromEntity(result),
		});
	}
}
