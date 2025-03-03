import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientAccountService } from "../service/patient-account.service";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import { IApiResponse, IPatientEntity } from "@contract";
import { PatientAccountResponse } from "@app/app/patient/account/dto/response/patient-account.response";
import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "account"))
export class PatientAccountController {
	constructor(private readonly service: PatientAccountService) {}

	/**
	 * Retrieves the account information associated with the currently logged in patient.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of patient account
	 */
	@Get()
	async getAccount(
		@GetPatientLogged() patient: IPatientEntity,
	): Promise<IApiResponse<PatientAccountResponse>> {
		const result = await this.service.getAccountByPatientId(patient.id);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_GET_ACCOUNT,
			data: PatientAccountResponse.fromEntity(result),
		});
	}
}
