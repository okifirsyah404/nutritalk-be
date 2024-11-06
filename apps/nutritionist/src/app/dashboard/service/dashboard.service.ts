import { CacheResult } from '@cache/app-cache/decorator/cache-result.decorator';
import { INutritionistEntity, ITransactionEntity } from '@database/prisma';
import { Injectable } from '@nestjs/common';
import { S3StorageService } from '@s3storage/s3storage';
import { DashboardRepository } from '../repository/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly s3Service: S3StorageService,
    private readonly repository: DashboardRepository,
  ) {}

  async getDashboardData(nutritionistId: string): Promise<{
    nutritionist: INutritionistEntity;
    countScheduledConsultation: number;
    scheduledConsultations: ITransactionEntity[];
    countPendingConsultation: number;
    pendingConsultations: ITransactionEntity[];
  }> {
    const [
      nutritionist,
      countScheduledConsultation,
      scheduledConsultations,
      countPendingConsultation,
      pendingConsultations,
    ] = await Promise.all([
      this._getProfile(nutritionistId),
      this._getCountScheduledConsultations(nutritionistId),
      this._getScheduledConsultations(nutritionistId),
      this._getCountPendingConsultations(nutritionistId),
      this._getPendingConsultations(nutritionistId),
    ]);

    return {
      nutritionist,
      countScheduledConsultation,
      scheduledConsultations,
      countPendingConsultation,
      pendingConsultations,
    };
  }

  @CacheResult<INutritionistEntity>((id: string) => `profile:${id}`)
  private async _getProfile(id: string): Promise<INutritionistEntity> {
    const result = await this.repository.getProfile(id);

    result.profile.imageKey = await this.s3Service.getSignedUrl(
      result.profile.imageKey,
    );

    return result;
  }

  @CacheResult<number>((id: string) => `countScheduledConsultation:${id}`)
  private async _getCountScheduledConsultations(id: string): Promise<number> {
    return this.repository.countNearbyScheduledConsultations(id);
  }

  @CacheResult<ITransactionEntity[]>(
    (id: string) => `scheduledConsultations:${id}`,
  )
  private async _getScheduledConsultations(
    id: string,
  ): Promise<ITransactionEntity[]> {
    return this.repository.getNearbyScheduledConsultations(id);
  }

  @CacheResult<number>((id: string) => `countPendingConsultation:${id}`)
  private async _getCountPendingConsultations(id: string): Promise<number> {
    return this.repository.countPendingConsultations(id);
  }

  @CacheResult<ITransactionEntity[]>(
    (id: string) => `pendingConsultations:${id}`,
  )
  private async _getPendingConsultations(
    id: string,
  ): Promise<ITransactionEntity[]> {
    return this.repository.getPendingConsultations(id);
  }
}
