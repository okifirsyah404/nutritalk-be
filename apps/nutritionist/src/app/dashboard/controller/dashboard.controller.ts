import { INVALID_TOKEN_CONTENT } from '@common/constant/docs/content/invalid-token.content';
import { BaseApiResponse } from '@common/response/base-api.response';
import { IApiResponse } from '@contract/response/api-response.interface';
import { INutritionistEntity } from '@database/prisma';
import { AccessTokenGuard } from '@jwt/app-jwt';
import GetNutritionistLogged from '@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DashboardResponse } from '../dto/response/dashboard.response';
import { DashboardService } from '../service/dashboard.service';
import { DocsTag } from '@nutritionist/common/docs/docs';

@ApiTags(DocsTag.DASHBOARD)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  content: {
    'application/json': {
      examples: {
        ...INVALID_TOKEN_CONTENT,
      },
    },
  },
})
@UseGuards(AccessTokenGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   *
   * Http endpoint for getting the dashboard data of a nutritionist.
   *
   * Response:
   * - status: string
   * - statusCode: number
   * - message: string
   * - data: object of dashboard data
   *
   */
  @ApiOkResponse({
    content: {
      'application/json': {
        example: BaseApiResponse.success({
          message: 'Dashboard data retrieved successfully',
          data: DashboardResponse.exampleData,
        }),
      },
    },
  })
  @Get()
  async getDashboardData(
    @GetNutritionistLogged() user: INutritionistEntity,
  ): Promise<IApiResponse<DashboardResponse>> {
    const result = await this.dashboardService.getDashboardData(user.id);

    return BaseApiResponse.success({
      message: 'Dashboard data retrieved successfully',
      data: DashboardResponse.fromData(result),
    });
  }
}
