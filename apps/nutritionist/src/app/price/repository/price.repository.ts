import { IPriceEntity, PrismaService } from '@database/prisma';
import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the price information associated with a specific nutritionist.
   *
   * @param nutritionistId - The unique identifier of the nutritionist.
   * @returns A promise that resolves to the price entity associated with the given nutritionist.
   */
  async getPriceByNutritionistId(
    nutritionistId: string,
  ): Promise<IPriceEntity> {
    return this.prisma.price.findFirst({
      where: {
        nutritionist: {
          id: nutritionistId,
        },
      },
      select: {
        ...PrismaSelector.PRICE,
      },
    });
  }

  /**
   * Updates the price information for a given price ID.
   *
   * @param {Object} params - The parameters for updating the price.
   * @param {string} params.priceId - The ID of the price to update.
   * @param {number} params.online - The new online price.
   * @param {number} params.offline - The new offline price.
   * @returns {Promise<IPriceEntity>} - A promise that resolves to the updated price entity.
   */
  async updatePrice({
    priceId,
    online,
    offline,
  }: {
    priceId: string;
    online: number;
    offline: number;
  }): Promise<IPriceEntity> {
    return this.prisma.price.update({
      where: {
        id: priceId,
      },
      data: {
        online,
        offline,
      },
      select: {
        ...PrismaSelector.PRICE,
      },
    });
  }
}
