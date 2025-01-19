import { BaseApiResponse } from "@common/response/base-api.response";
import {
	INVALID_TOKEN_CONTENT,
	ProfileErrorMessage,
	ProfileSuccessMessage,
} from "@constant/constant";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { ProfileResponse } from "../../dto/response/profile.response";

export abstract class ProfileContentDocs {
	static readonly GET_PROFILE_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: ProfileSuccessMessage.SUCCESS_GET_PROFILE,
				data: ProfileResponse.exampleData,
			}),
		},
	};

	static readonly PROFILE_UPDATE_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: ProfileSuccessMessage.SUCCESS_UPDATE_PROFILE,
				data: ProfileResponse.exampleData,
			}),
		},
	};

	static readonly PROFILE_UPLOAD_IMAGE_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: ProfileSuccessMessage.SUCCESS_UPLOAD_IMAGE_PROFILE,
				data: ProfileResponse.exampleData,
			}),
		},
	};

	static readonly SET_AVAILABILITY_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: ProfileSuccessMessage.SUCCESS_SET_AVAILABILITY,
				data: ProfileResponse.exampleData,
			}),
		},
	};

	static readonly NOT_FOUND: ContentObject = {
		"application/json": {
			example: BaseApiResponse.notFound({
				message: ProfileErrorMessage.ERR_PROFILE_NOT_FOUND,
			}),
		},
	};

	static readonly UNAUTHORIZED: ContentObject = {
		"application/json": {
			examples: {
				...INVALID_TOKEN_CONTENT,
			},
		},
	};
}
