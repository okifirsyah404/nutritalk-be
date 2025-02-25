import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientProfileService } from "../service/patient-profile.service";
import { IApiResponse, IPatientEntity } from "@contract";
import { BaseApiResponse } from "@common";
import { ProfileSuccessMessage } from "@constant/message";
import { PatientProfileResponse } from "@app/app/patient/profile/dto/response/patient-profile.response";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "profile"))
export class PatientProfileController {
	constructor(private readonly service: PatientProfileService) {}

	/**
	 *
	 * Http endpoint for getting the profile of a patient.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of profile information
	 *
	 */
	@Get()
	async getProfile(
		@GetPatientLogged() patient: IPatientEntity,
	): Promise<IApiResponse<PatientProfileResponse>> {
		const result = await this.service.getProfileById(patient.id);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_GET_PROFILE,
			data: PatientProfileResponse.fromEntity(result),
		});
	}
}
