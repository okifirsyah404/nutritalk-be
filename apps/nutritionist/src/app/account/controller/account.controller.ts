import { BaseApiResponse } from '@common/response/base-api.response';
import { IApiResponse } from '@contract/response/api-response.interface';
import { INutritionistEntity } from '@database/prisma';
import { AccessTokenGuard } from '@jwt/app-jwt';
import GetNutritionistLogged from '@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccountSuccessMessage } from '@nutritionist/common/constant/message/success/account-success.message';
import { DocsTag } from '@nutritionist/common/docs/docs';
import { AccountOperation } from '../docs/account.operation';
import { AccountContentDocs } from '../docs/content/account.content';
import { AccountResponse } from '../dto/response/account.response';
import { AccountService } from '../service/account.service';

@ApiTags(DocsTag.ACCOUNT)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  content: AccountContentDocs.UNAUTHORIZED,
})
@UseGuards(AccessTokenGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   *
   * Http endpoint for getting the account of a nutritionist.
   *
   * Response:
   * - status: string
   * - statusCode: number
   * - message: string
   * - data: object of account information
   *
   */
  @ApiOperation(AccountOperation.GET_ACCOUNT)
  @ApiOkResponse({
    content: AccountContentDocs.GET_ACCOUNT_SUCCESS,
  })
  @ApiNotFoundResponse({
    content: AccountContentDocs.NOT_FOUND,
  })
  @Get()
  async getAccount(
    @GetNutritionistLogged() nutritionist: INutritionistEntity,
  ): Promise<IApiResponse<AccountResponse>> {
    const result = await this.accountService.getAccountByNutritionistId(
      nutritionist.id,
    );

    return BaseApiResponse.success({
      message: AccountSuccessMessage.SUCCESS_GET_ACCOUNT,
      data: AccountResponse.fromEntity(result),
    });
  }
}
