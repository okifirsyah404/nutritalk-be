import { Injectable } from "@nestjs/common";
import { PrismaSelector, PrismaService } from "@config/prisma";
import { MidtransNotificationRequest } from "@app/app/common/midtrans-notification/dto/request/midtrans-notification.request";
import { createDatabaseErrorHandler } from "@infrastructure";
import { IConsultationEntity } from "@contract";
import { TransactionStatus } from "@prisma/client";

@Injectable()
export class MidtransNotificationRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findConsultationByTrId(trId: string): Promise<IConsultationEntity> {
		const consultation = await this.prisma.consultation
			.findUnique({
				where: {
					trId,
				},
				select: PrismaSelector.CONSULTATION,
			})
			.catch(createDatabaseErrorHandler);

		return consultation;
	}

	async updateTransactionPayment(
		consultationId: string,
		data: MidtransNotificationRequest,
	): Promise<void> {
		await this.prisma.transactionPayment
			.update({
				where: {
					consultationId,
				},
				data: {
					status: data.transaction_status,
					method: data.payment_type,
					code: data.payment_code,
					date: data.transaction_time,
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async updateConsultationStatus(
		consultationId: string,
		status: TransactionStatus,
	): Promise<void> {
		await this.prisma.consultation
			.update({
				where: {
					id: consultationId,
				},
				data: {
					status,
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
