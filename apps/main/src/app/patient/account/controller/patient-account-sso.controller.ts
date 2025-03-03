import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { PatientAccountSSOService } from "@app/app/patient/account/service/patient-account-sso.service";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import { IPatientEntity } from "@contract";
import { PatientBindGoogleSSORequest } from "@app/app/patient/account/dto/request/patient-bind-google-sso.request";
import { PatientAccountResponse } from "@app/app/patient/account/dto/response/patient-account.response";
import { UriUtil } from "@util";
import { AccountRole } from "@prisma/client";
import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "account/sso"))
export class PatientAccountSSOController {
	constructor(private readonly service: PatientAccountSSOService) {}

	/**
	 *
	 * Http endpoint for binding a Google SSO account to the patient account.
	 *
	 * Request body:
	 * - idToken: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of patient account
	 */
	@Put("google")
	async bindGoogleSSO(
		@GetPatientLogged() patient: IPatientEntity,
		@Body() data: PatientBindGoogleSSORequest,
	): Promise<BaseApiResponse<PatientAccountResponse>> {
		const result = await this.service.bindGoogleSSO(patient.account, data);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_BIND_GOOGLE_SSO,
			data: PatientAccountResponse.fromEntity(result),
		});
	}
}
