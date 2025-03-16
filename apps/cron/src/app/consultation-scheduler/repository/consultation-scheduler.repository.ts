import { PrismaSelector, PrismaService } from "@config/prisma";
import { Injectable } from "@nestjs/common";
import { CreditAction, TransactionStatus } from "@prisma/client";

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

	async updateWaitingConfirmationConsultation(): Promise<number> {
		return await this.prisma.$transaction(async (trx) => {
			// Get consultations that need to be canceled
			const consultations = await trx.consultation.findMany({
				where: {
					status: TransactionStatus.WAITING_CONFIRMATION,
					consultationTime: {
						end: { lte: new Date() },
					},
				},
				select: {
					...PrismaSelector.CONSULTATION,
					transactionPrice: {
						select: PrismaSelector.TRANSACTION_PRICE,
					},
					patient: {
						select: {
							id: true,
							credit: {
								select: { id: true, balance: true },
							},
						},
					},
				},
			});

			if (consultations.length === 0) return 0;

			// Process refunds per consultation
			await Promise.all(
				consultations.map(({ transactionPrice, patient, trId }) => {
					if (!patient?.credit) return;

					const refundAmount = transactionPrice?.total ?? 0;
					return trx.credit.update({
						where: { id: patient.credit.id },
						data: {
							balance: { increment: refundAmount },
							creditHistories: {
								create: {
									action: CreditAction.REFUND,
									amount: refundAmount,
									note: `Refund for consultation ${trId} due to waiting confirmation`,
								},
							},
						},
					});
				}),
			);

			// Cancel consultations
			await trx.consultation.updateMany({
				where: {
					id: { in: consultations.map(({ id }) => id) },
				},
				data: {
					status: TransactionStatus.CANCELED,
				},
			});

			return consultations.length;
		});
	}

	async updateScheduledConsultation(): Promise<number> {
		return await this.prisma.$transaction(async (trx) => {
			const count = await trx.consultation.count({
				where: {
					status: {
						in: [TransactionStatus.SCHEDULED, TransactionStatus.RE_SCHEDULED],
					},
					consultationTime: {
						start: {
							lte: new Date(),
						},
					},
				},
			});

			await trx.consultation.updateMany({
				where: {
					status: {
						in: [TransactionStatus.SCHEDULED, TransactionStatus.RE_SCHEDULED],
					},
					consultationTime: {
						start: {
							lte: new Date(),
						},
					},
				},
				data: {
					status: TransactionStatus.ON_PROCESS,
				},
			});

			return count;
		});
	}

	async updatOnProcessConsultation(): Promise<number> {
		return await this.prisma.$transaction(async (trx) => {
			const count = await trx.consultation.count({
				where: {
					status: TransactionStatus.ON_PROCESS,
					consultationTime: {
						end: {
							lte: new Date(),
						},
					},
				},
			});

			await trx.consultation.updateMany({
				where: {
					status: TransactionStatus.ON_PROCESS,
					consultationTime: {
						end: {
							lte: new Date(),
						},
					},
				},
				data: {
					status: TransactionStatus.FINISHED,
				},
			});

			return count;
		});
	}
}
