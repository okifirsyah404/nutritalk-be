import { BaseApiResponse } from '@common/common';
import { INutritionist } from '@database/prisma';
import { AccessTokenGuard } from '@jwt/app-jwt';
import GetNutritionistLogged from '@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { UpdateProfileRequest } from '../dto/request/update-profile.request';
import { ProfileResponse } from '../dto/response/profile.response';
import { ProfileService } from '../service/profile.service';
import { IApiResponse } from '@contract/contract/response/api-response.interface';

@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  async getProfile(
    @GetNutritionistLogged() nutritionist: INutritionist,
  ): Promise<IApiResponse<ProfileResponse>> {
    const result = await this.service.getProfileById(nutritionist.id);

    return BaseApiResponse.success({
      message: 'Profile found',
      data: ProfileResponse.fromEntity(result),
    });
  }

  @Put()
  async updateProfile(
    @GetNutritionistLogged() nutritionist: INutritionist,
    @Body() reqBody: UpdateProfileRequest,
  ): Promise<IApiResponse<ProfileResponse>> {
    const result = await this.service.updateProfile(nutritionist, reqBody);

    return BaseApiResponse.success({
      message: 'Profile updated',
      data: ProfileResponse.fromEntity(result),
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
    }),
  )
  async uploadProfile(
    @GetNutritionistLogged() nutritionist: INutritionist,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IApiResponse<ProfileResponse>> {
    const result = await this.service.uploadProfile(nutritionist, file);

    return BaseApiResponse.success({
      message: 'Profile updated',
      data: ProfileResponse.fromEntity(result),
    });
  }
}
