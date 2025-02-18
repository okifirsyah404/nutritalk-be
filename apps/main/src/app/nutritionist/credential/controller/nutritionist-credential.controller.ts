import { BaseApiResponse } from "@common";
import { CredentialSuccessMessage } from "@constant/message";
import { INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistUpdateCredentialRequest } from "../dto/request/nutritionist-update-credential.request";
import { NutritionistCredentialResponse } from "../dto/response/nutritionist-credential.response";
import { NutritionistCredentialService } from "../service/nutritionist-credential.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "credential"))
export class NutritionistCredentialController {
	constructor(private readonly service: NutritionistCredentialService) {}

	@Get()
	async getNutritionist(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<BaseApiResponse<NutritionistCredentialResponse>> {
		const result = await this.service.getNutritionist(nutritionist.id);

		return BaseApiResponse.success({
			message: CredentialSuccessMessage.SUCCESS_GET_CREDENTIAL,
			data: NutritionistCredentialResponse.fromEntity(result),
		});
	}

	@Put()
	async updateCredential(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistUpdateCredentialRequest,
	): Promise<BaseApiResponse<NutritionistCredentialResponse>> {
		const result = await this.service.updateCredential(
			nutritionist.id,
			reqBody,
		);

		return BaseApiResponse.success({
			message: CredentialSuccessMessage.SUCCESS_UPDATE_CREDENTIAL,
			data: NutritionistCredentialResponse.fromEntity(result),
		});
	}
}
