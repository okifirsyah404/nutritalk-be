import { PrismaService } from "@config/prisma";
import { ISignatureEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

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
	async getSignature(signature: string): Promise<ISignatureEntity> {
		return this.prisma.signature
			.findUnique({
				where: {
					signature: signature,
				},
			})
			.catch(createDatabaseErrorHandler);
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
	async createSignature(signature: string): Promise<ISignatureEntity> {
		return this.prisma.signature
			.create({
				data: {
					signature,
				},
			})
			.catch(createDatabaseErrorHandler);
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
		await this.prisma.signature
			.delete({
				where: {
					signature: signature,
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
