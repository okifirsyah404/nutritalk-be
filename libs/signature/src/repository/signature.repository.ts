import { ISignature, PrismaService } from '@database/prisma';
import { Injectable } from '@nestjs/common';

/**
 *
 * The SignatureRepository class provides methods to interact with the signature records in the database.
 * It uses PrismaService to perform CRUD operations on the signature table.
 *
 * @class
 *
 */
@Injectable()
export class SignatureRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   *
   * Retrieves a signature record from the database.
   *
   * @param signature - The signature string to search for.
   *
   * @returns { ISignature } A promise that resolves to the signature record if found, or null if not found.
   *
   */
  async getSignature(signture: string): Promise<ISignature> {
    return this.prisma.signature.findUnique({
      where: {
        signature: signture,
      },
    });
  }

  /**
   *
   * Creates a new signature in the database.
   *
   * @param signature - The signature string to be stored.
   *
   * @returns { ISignature } A promise that resolves to the created signature object.
   *
   */
  async createSignature(signature: string): Promise<ISignature> {
    return this.prisma.signature.create({
      data: {
        signature,
      },
    });
  }

  /**
   * Deletes a signature from the database.
   *
   * @param signature - The signature to be deleted.
   *
   * @returns A promise void.
   *
   */
  async deleteSignature(signature: string): Promise<void> {
    await this.prisma.signature.delete({
      where: {
        signature: signature,
      },
    });
  }
}
