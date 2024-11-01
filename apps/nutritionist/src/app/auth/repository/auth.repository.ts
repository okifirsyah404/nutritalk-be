import { IAccount, PrismaService } from '@database/prisma';
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
   * Finds an account by ID.
   *
   * @param id - The ID of the account to find.
   * @returns A promise that resolves to the found account, including the password and associated nutritionist.
   */
  async findAccountById(id: string): Promise<IAccount> {
    return this.prisma.account.findUnique({
      where: {
        id,
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

  async updatePassword(id: string, password: string): Promise<IAccount> {
    return this.prisma.account.update({
      where: {
        id,
      },
      data: {
        password,
      },
      select: {
        ...PrismaSelector.account,
        nutritionist: {
          select: PrismaSelector.nutritionist,
        },
      },
    });
  }
}
