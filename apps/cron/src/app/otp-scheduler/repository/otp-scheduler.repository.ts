import { PrismaService } from "@config/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OtpSchedulerRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Deletes multiple OTP (One-Time Password) records from the database.
	 *
	 * This method uses the Prisma ORM to delete all OTP records.
	 *
	 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
	 */
	async deleteManyOtp(): Promise<void> {
		await this.prisma.otp.deleteMany();
	}
}
