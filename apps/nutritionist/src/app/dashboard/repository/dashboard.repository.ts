import { INutritionistEntity, PrismaService } from '@database/prisma';
import PrismaSelector from '@database/prisma/helper/prisma.selector';

export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(id: string): Promise<INutritionistEntity> {
    return this.prisma.nutritionist.findUnique({
      where: {
        id: id,
      },
      select: {
        ...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
        account: {
          select: PrismaSelector.ACCOUNT,
        },
        consultationMeta: {
          select: PrismaSelector.CONSULTATION_META,
        },
      },
    });
  }
}
