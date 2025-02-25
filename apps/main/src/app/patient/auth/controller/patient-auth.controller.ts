import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientAuthService } from "../service/patient-auth.service";
import { IApiResponse, IJwtRefresh, IPatientEntity } from "@contract";
import { BaseApiResponse } from "@common";
import { AuthSuccessMessage } from "@constant/message";
import {
	AccessTokenGuard,
	GetPatientLogged,
	RefreshToken,
	RefreshTokenGuard,
} from "@module/app-jwt";
import { PatientAuthSignInRequest } from "@app/app/patient/auth/dto/request/patient-auth-sign-in.request";
import { PatientAuthResponse } from "@app/app/patient/auth/dto/response/patient-auth.response";
import { PatientAuthRefreshTokenRequest } from "@app/app/patient/auth/dto/request/patient-auth-refresh-token.request";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "auth"))
export class PatientAuthController {
	constructor(private readonly service: PatientAuthService) {}

	/**
	 *
	 * Http endpoint for signing up a nutritionist.
	 *
	 * Request body:
	 * - email: (required) string
	 * - password: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of accessToken and refreshToken
	 *
	 */
	@Post("sign-in")
	async signIn(
		@Body() reqBody: PatientAuthSignInRequest,
	): Promise<IApiResponse<PatientAuthResponse>> {
		const result = await this.service.signIn(reqBody);

		return BaseApiResponse.created({
			message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_IN,
			data: PatientAuthResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for refreshing the access token.
	 *
	 * Request header:
	 * - x-refresh-token: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of accessToken and refreshToken
	 *
	 */
	@Post("refresh-token")
	@UseGuards(RefreshTokenGuard)
	async getRefreshToken(
		@RefreshToken() refreshToken: IJwtRefresh,
		@Body() reqBody: PatientAuthRefreshTokenRequest,
	): Promise<IApiResponse<PatientAuthResponse>> {
		const result = await this.service.refreshToken(refreshToken, reqBody);

		return BaseApiResponse.success({
			message: AuthSuccessMessage.SUCCESS_AUTH_REFRESH_TOKEN,
			data: PatientAuthResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for signing out a user.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: undefined
	 *
	 */
	@UseGuards(AccessTokenGuard)
	@Delete("sign-out")
	async signOut(
		@GetPatientLogged() patient: IPatientEntity,
	): Promise<IApiResponse<undefined>> {
		await this.service.signOut(patient.account.id);

		return BaseApiResponse.success({
			message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_OUT,
			data: undefined,
		});
	}
}
