import { BaseApiResponse } from '@common/response/base-api.response';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { PriceErrorMessage } from '@nutritionist/common/constant/message/error/price-error.message';
import { PriceSuccessMessage } from '@nutritionist/common/constant/message/success/price-success.message';
import { PriceResponse } from '../../dto/response/price.response';
import { INVALID_TOKEN_CONTENT } from '@common/constant/docs/content/invalid-token.content';

export abstract class PriceContentDocs {
  static readonly SUCCESS_GET_PRICE: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: PriceSuccessMessage.SUCCESS_GET_PRICE,
        data: PriceResponse.exampleData,
      }),
    },
  };

  static readonly SUCCESS_UPDATE_PRICE: ContentObject = {
    'application/json': {
      example: BaseApiResponse.success({
        message: PriceSuccessMessage.SUCCESS_UPDATE_PRICE,
        data: PriceResponse.exampleData,
      }),
    },
  };

  static readonly NOT_FOUND: ContentObject = {
    'application/json': {
      example: BaseApiResponse.notFound({
        message: PriceErrorMessage.ERR_PRICE_NOT_FOUND,
      }),
    },
  };

  static readonly UNAUTHORIZED: ContentObject = {
    'application/json': {
      examples: {
        ...INVALID_TOKEN_CONTENT,
      },
    },
  };
}
