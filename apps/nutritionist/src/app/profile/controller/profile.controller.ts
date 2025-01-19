import { BaseApiResponse } from "@common/response/base-api.response";
import { IApiResponse } from "@contract/response/api-response.interface";
import { INutritionistEntity } from "@database/prisma";
import { AccessTokenGuard } from "@jwt/app-jwt";
import GetNutritionistLogged from "@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator";
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
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ProfileSuccessMessage } from "@nutritionist/common/constant/message/success/profile-success.message";
import { DocsTag } from "@nutritionist/common/docs/docs";
import multer from "multer";
import { ProfileContentDocs } from "../docs/content/profile.content";
import { UpdateProfileRequest } from "../dto/request/update-profile.request";
import { ProfileResponse } from "../dto/response/profile.response";
import { ProfileService } from "../service/profile.service";

@ApiTags(DocsTag.PROFILE)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
	content: ProfileContentDocs.UNAUTHORIZED,
})
@ApiNotFoundResponse({
	content: ProfileContentDocs.NOT_FOUND,
})
@UseGuards(AccessTokenGuard)
@Controller("profile")
export class ProfileController {
	constructor(private readonly service: ProfileService) {}

	private readonly logger = new Logger(ProfileController.name);

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
	@ApiOkResponse({
		content: ProfileContentDocs.GET_PROFILE_SUCCESS,
	})
	@Get()
	async getProfile(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<ProfileResponse>> {
		const result = await this.service.getProfileById(nutritionist.id);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_GET_PROFILE,
			data: ProfileResponse.fromEntity(result),
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
	@ApiOkResponse({
		content: ProfileContentDocs.PROFILE_UPDATE_SUCCESS,
	})
	@Put()
	async updateProfile(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: UpdateProfileRequest,
	): Promise<IApiResponse<ProfileResponse>> {
		const result = await this.service.updateProfile(nutritionist, reqBody);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_UPDATE_PROFILE,
			data: ProfileResponse.fromEntity(result),
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
	@ApiOkResponse({
		content: ProfileContentDocs.PROFILE_UPLOAD_IMAGE_SUCCESS,
	})
	@Post("upload")
	@UseInterceptors(
		FileInterceptor("image", {
			storage: multer.memoryStorage(),
		}),
	)
	async uploadProfile(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@UploadedFile() file: Express.Multer.File,
	): Promise<IApiResponse<ProfileResponse>> {
		const result = await this.service.uploadProfile(nutritionist, file);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_UPLOAD_IMAGE_PROFILE,
			data: ProfileResponse.fromEntity(result),
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
	@ApiOkResponse({
		content: ProfileContentDocs.SET_AVAILABILITY_SUCCESS,
	})
	@Get("set-availability")
	async setAvailability(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<ProfileResponse>> {
		const result = await this.service.setNutritionistAvailability(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message: ProfileSuccessMessage.SUCCESS_SET_AVAILABILITY,
			data: ProfileResponse.fromEntity(result),
		});
	}
}
