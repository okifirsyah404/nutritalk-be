import {
  IAccount,
  IAccountWithoutPassword,
  INutritionist,
  PrismaService,
} from '@database/prisma';
import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Finds an account by email.
   *
   * @param email - The email of the account to find.
   * @returns A promise that resolves to the found account, including the password and associated nutritionist.
   */
  async findAccountByEmail(email: string): Promise<IAccount> {
    return this.prisma.account.findUnique({
      where: {
        email: email,
      },
      select: {
        ...PrismaSelector.account,
        password: true,
        nutritionist: {
          select: PrismaSelector.nutritionist,
        },
      },
    });
  }

  /**
   * Updates the FCM token for a specific account.
   *
   * @param id - The ID of the account.
   * @param fcmToken - The new FCM token to be set.
   * @returns A promise that resolves to the updated account.
   */
  async updateFcmToken(id: string, fcmToken: string): Promise<IAccount> {
    return this.prisma.account.update({
      where: {
        id,
      },
      data: {
        fcmToken,
      },
    });
  }

  /**
   * Updates the refresh token for a specific account.
   *
   * @param id - The unique identifier of the account.
   * @param refreshToken - The new refresh token to be set.
   * @returns A promise that resolves to the updated account information.
   */
  async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<IAccount> {
    return this.prisma.account.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  }

  /**
   * Finds a nutritionist by their unique identifier.
   *
   * @param id - The unique identifier of the nutritionist.
   * @returns A promise that resolves to the nutritionist object if found, otherwise null.
   */
  async findNutritionistById(id: string): Promise<INutritionist> {
    return this.prisma.nutritionist.findUnique({
      where: { id },
      select: {
        ...PrismaSelector.nutritionist,
        account: {
          select: PrismaSelector.account,
        },
      },
    });
  }

  async findAccountByIdAndRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<IAccountWithoutPassword> {
    return this.prisma.account.findUnique({
      where: {
        id,
        refreshToken,
      },
      select: {
        ...PrismaSelector.account,
      },
    });
  }
}
