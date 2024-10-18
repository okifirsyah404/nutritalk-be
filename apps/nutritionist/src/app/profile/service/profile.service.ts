import { INutritionist } from '@database/prisma';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AppS3StorageService } from '@s3storage/s3storage/provider/app-s3storage.service';
import DateUtils from '@util/util/utilities/date.util';
import { UpdateProfileRequest } from '../dto/request/update-profile.request';
import { ProfileRepository } from '../repository/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly repository: ProfileRepository,
    private readonly s3Service: AppS3StorageService,
  ) {}

  private readonly logger = new Logger(ProfileService.name);

  async getProfileById(id: string): Promise<INutritionist> {
    const result = await this.repository.getProfileById(id);

    if (!result) {
      throw new NotFoundException('Profile not found');
    }

    result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

    this.logger.verbose(`Profile found: ${result.id}`);

    return result;
  }

  async updateProfile(
    nutritionist: INutritionist,
    reqData: UpdateProfileRequest,
  ): Promise<INutritionist> {
    const result = await this.repository.updateProfile({
      id: nutritionist.id,
      name: reqData.name,
      address: reqData.address,
      phoneNumber: reqData.phoneNumber,
      dateOfBirth: reqData.dateOfBirth,
      placeOfBirth: reqData.placeOfBirth,
      age: (await DateUtils.countAge(reqData.dateOfBirth)).year,
    });

    if (!result) {
      throw new NotFoundException('Profile not found');
    }

    result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

    return result;
  }

  async uploadProfile(
    nutritionist: INutritionist,
    file: Express.Multer.File,
  ): Promise<INutritionist> {
    const key = await this.s3Service.uploadProfileImage({
      seed: nutritionist.id,
      role: nutritionist.account.role,
      file: file,
    });

    const result = await this.repository.updateImageKey(nutritionist.id, key);

    if (!result) {
      throw new NotFoundException('Profile not found');
    }

    result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

    return result;
  }
}
