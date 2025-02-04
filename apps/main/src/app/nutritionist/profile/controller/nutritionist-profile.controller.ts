import { BaseApiResponse, ImageFileValidationPipe } from "@common";
import { ProfileSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import {
	Body,
	Controller,
	Get,
	Logger,
	Post,
	Put,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { NutritionistUpdateProfileRequest } from "../dto/request/nutritionist-update-profile.request";
import { NutritionistProfileResponse } from "../dto/response/nutritionist-profile.response";
import { NutritionistProfileService } from "../service/nutritionist-profile.service";

@UseGuards(AccessTokenGuard)
@Controller("nutritionist/profile")
export class NutritionistProfileController {
	constructor(private readonly service: NutritionistProfileService) {}

	private readonly logger = new Logger(NutritionistProfileController.name);

	/**
	 *
	 * Http endpoint for getting the profile of a nutritionist.
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
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistProfileResponse>> {
		const result = await this.service.getProfileById(nutritionist.id);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_GET_PROFILE,
			data: NutritionistProfileResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for updating the profile of a nutritionist.
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
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistUpdateProfileRequest,
	): Promise<IApiResponse<NutritionistProfileResponse>> {
		const result = await this.service.updateProfile(nutritionist, reqBody);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_UPDATE_PROFILE,
			data: NutritionistProfileResponse.fromEntity(result),
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
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@UploadedFile(new ImageFileValidationPipe()) file: Express.Multer.File,
	): Promise<IApiResponse<NutritionistProfileResponse>> {
		const result = await this.service.uploadProfile(nutritionist, file);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_UPLOAD_IMAGE_PROFILE,
			data: NutritionistProfileResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for setting the availability of a nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of updated profile information
	 *
	 */
	@Get("set-availability")
	async setAvailability(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistProfileResponse>> {
		const result = await this.service.setNutritionistAvailability(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_SET_AVAILABILITY,
			data: NutritionistProfileResponse.fromEntity(result),
		});
	}
}
