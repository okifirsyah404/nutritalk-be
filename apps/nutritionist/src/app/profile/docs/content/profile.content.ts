import { INVALID_TOKEN_CONTENT } from '@common/constant/docs/content/invalid-token.content';
import { BaseApiResponse } from '@common/response/base-api.response';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ProfileErrorMessage } from '@nutritionist/common/constant/message/error/profile_error.message';
import { ProfileSuccessMessage } from '@nutritionist/common/constant/message/success/profile-success.message';
import { ProfileResponse } from '../../dto/response/profile.response';

export abstract class ProfileContentDocs {
  static readonly PROFILE_SUCCESS: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: ProfileSuccessMessage.SUCCESS_PROFILE,
        data: ProfileResponse.exampleData,
      }),
    },
  };

  static readonly PROFILE_UPDATE_SUCCESS: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: ProfileSuccessMessage.SUCCESS_PROFILE_UPDATE,
        data: ProfileResponse.exampleData,
      }),
    },
  };

  static readonly PROFILE_UPLOAD_IMAGE_SUCCESS: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: ProfileSuccessMessage.SUCCESS_PROFILE_UPLOAD_IMAGE,
        data: ProfileResponse.exampleData,
      }),
    },
  };

  static readonly PROFILE_SET_AVAILABILITY_SUCCESS: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: ProfileSuccessMessage.SUCCESS_PROFILE_SET_AVAILABILITY,
        data: ProfileResponse.exampleData,
      }),
    },
  };

  static readonly PROFILE_NOT_FOUND: ContentObject = {
    'application/json': {
      example: BaseApiResponse.notFound({
        message: ProfileErrorMessage.ERR_PROFILE_NOT_FOUND,
      }),
    },
  };

  static readonly PROFILE_UNAUTHORIZED: ContentObject = {
    'application/json': {
      examples: {
        ...INVALID_TOKEN_CONTENT,
      },
    },
  };
}
