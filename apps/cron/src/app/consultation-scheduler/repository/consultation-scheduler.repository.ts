import { PrismaService } from "@config/prisma";
import { Injectable } from "@nestjs/common";
import { TransactionStatus } from "@prisma/client";

@Injectable()
export class ConsultationSchedulerRepository {
	constructor(private readonly prisma: PrismaService) {}

	async updateWaitingPaymentConsultation(): Promise<number> {
		return await this.prisma.$transaction(async (trx) => {
			const count = await trx.consultation.count({
				where: {
					status: TransactionStatus.WAITING_PAYMENT,
					consultationTime: {
						end: {
							lte: new Date(),
						},
					},
				},
			});

			await trx.consultation.updateMany({
				where: {
					status: TransactionStatus.WAITING_PAYMENT,
					consultationTime: {
						end: {
							lte: new Date(),
						},
					},
				},
				data: {
					status: TransactionStatus.CANCELED_PAYMENT,
				},
			});

			return count;
		});
	}
}
