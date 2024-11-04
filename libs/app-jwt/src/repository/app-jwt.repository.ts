import {
  IAccountEntity,
  INutritionistEntity,
  IPatientEntity,
  PrismaService,
} from '@database/prisma';
import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppJwtRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   *
   * Finds a nutritionist by their unique ID.
   *
   * @param nutritionistId - The unique identifier of the nutritionist.
   *
   * @returns A promise that resolves to the nutritionist object if found, otherwise null.
   *
   */
  async findNutritionistById(
    nutritionistId: string,
  ): Promise<INutritionistEntity> {
    return this.prisma.nutritionist.findUnique({
      where: { id: nutritionistId },
      select: {
        ...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
        account: {
          select: PrismaSelector.ACCOUNT,
        },
      },
    });
  }

  /**
   *
   * Finds a patient by their unique identifier.
   *
   * @param patientId - The unique identifier of the patient.
   *
   * @returns A promise that resolves to the patient object if found, otherwise null.
   *
   */
  async findPatientById(patientId: string): Promise<IPatientEntity> {
    return this.prisma.patient.findUnique({
      where: { id: patientId },
      select: {
        ...PrismaSelector.PATIENT,
        account: {
          select: PrismaSelector.ACCOUNT,
        },
      },
    });
  }

  /**
   *
   * Finds an account by its ID and refresh token.
   *
   * @param id - The unique identifier of the account.
   * @param refreshToken - The refresh token associated with the account.
   *
   * @returns A promise that resolves to an account object without the password field.
   *
   */
  async findAccountByIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<IAccountEntity> {
    return this.prisma.account.findUnique({
      where: {
        id,
        refreshToken,
      },
      select: {
        ...PrismaSelector.ACCOUNT,
      },
    });
  }

  /**
   *
   * Updates the refresh token for a given account.
   *
   * @param accountId - The unique identifier of the account.
   * @param refreshToken - The new refresh token to be set for the account.
   *
   * @returns A promise that resolves to the updated account object.
   *
   */
  async updateRefreshToken(
    accountId: string,
    refreshToken: string,
  ): Promise<IAccountEntity> {
    return this.prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        refreshToken,
      },
    });
  }
}
