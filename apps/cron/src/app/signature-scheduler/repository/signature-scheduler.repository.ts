import { PrismaService } from "@config/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SignatureSchedulerRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Deletes multiple signature records from the database.
	 *
	 * This method uses the Prisma ORM to delete all signature records.
	 *
	 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
	 */
	async deleteManySignature(): Promise<void> {
		await this.prisma.signature.deleteMany();
	}
}
