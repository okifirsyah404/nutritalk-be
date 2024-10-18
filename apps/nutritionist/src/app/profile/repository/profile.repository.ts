import { INutritionist, PrismaService } from '@database/prisma';
import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProfileById(id: string): Promise<INutritionist> {
    return this.prisma.nutritionist.findUnique({
      where: {
        id: id,
      },
      select: {
        ...PrismaSelector.nutritionist,
        account: {
          select: PrismaSelector.account,
        },
      },
    });
  }

  async updateProfile({
    id,
    name,
    phoneNumber,
    address,
    placeOfBirth,
    dateOfBirth,
    age,
  }: {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    placeOfBirth: string;
    dateOfBirth: Date;
    age: number;
  }): Promise<INutritionist> {
    return this.prisma.nutritionist.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            name,
            phoneNumber,
            address,
            placeOfBirth,
            dateOfBirth,
            age,
          },
        },
      },
      select: {
        ...PrismaSelector.nutritionist,
        account: {
          select: PrismaSelector.account,
        },
      },
    });
  }

  async updateImageKey(id: string, key: string): Promise<INutritionist> {
    return this.prisma.nutritionist.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            imageKey: key,
          },
        },
      },
      select: {
        ...PrismaSelector.nutritionist,
        account: {
          select: PrismaSelector.account,
        },
      },
    });
  }
}
