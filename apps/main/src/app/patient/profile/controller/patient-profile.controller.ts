import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientProfileService } from "../service/patient-profile.service";
import { IApiResponse, IPatientEntity } from "@contract";
import { BaseApiResponse, ImageFileValidationPipe } from "@common";
import { ProfileSuccessMessage } from "@constant/message";
import { PatientProfileResponse } from "@app/app/patient/profile/dto/response/patient-profile.response";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import { FileInterceptor } from "@nestjs/platform-express";
import { PatientUpdateProfileRequest } from "@app/app/patient/profile/dto/request/patient-update-profile.request";

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

	/**
	 *
	 * Http endpoint for updating the profile of a patient.
	 *
	 * Request body:
	 * - name: (required) string
	 * - phoneNumber: (required) string
	 * - address: (required) string
	 * - placeOfBirth: (required) string
	 * - dateOfBirth: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of updated profile information
	 *
	 */
	@Put()
	async updateProfile(
		@GetPatientLogged() patient: IPatientEntity,
		@Body() reqBody: PatientUpdateProfileRequest,
	): Promise<IApiResponse<PatientProfileResponse>> {
		const result = await this.service.updateProfile(patient, reqBody);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_UPDATE_PROFILE,
			data: PatientProfileResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for uploading a profile image.
	 *
	 * Request body:
	 * - image: (required) file
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of updated profile information
	 *
	 */
	@Post("upload")
	@UseInterceptors(FileInterceptor("image"))
	async uploadProfile(
		@GetPatientLogged() patient: IPatientEntity,
		@UploadedFile(new ImageFileValidationPipe()) file: Express.Multer.File,
	): Promise<IApiResponse<PatientProfileResponse>> {
		const result = await this.service.uploadProfile(patient, file);

		return BaseApiResponse.created({
			message: ProfileSuccessMessage.SUCCESS_UPLOAD_IMAGE_PROFILE,
			data: PatientProfileResponse.fromEntity(result),
		});
	}
}
