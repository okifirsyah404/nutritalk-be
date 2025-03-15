import { Injectable, NotFoundException } from "@nestjs/common";
import { MidtransNotificationRepository } from "@app/app/common/midtrans-notification/repository/midtrans-notification.repository";
import {
	MidtransNotificationRequest,
	MidtransNotificationVANumber,
} from "@app/app/common/midtrans-notification/dto/request/midtrans-notification.request";
import { MidtransTransactionStatus } from "@contract";
import { TransactionStatus } from "@prisma/client";

@Injectable()
export class MidtransNotificationService {
	constructor(private readonly repository: MidtransNotificationRepository) {}

	/**
	 *
	 * Handle midtrans notification.
	 *
	 * @param data
	 */
	async onMidtransNotification(
		data: MidtransNotificationRequest,
	): Promise<MidtransNotificationRequest> {
		const consultation = await this.repository.findConsultationByTrId(
			data.order_id,
		);

		if (!consultation) {
			throw new NotFoundException("Consultation not found");
		}

		await this.repository.updateTransactionPayment(consultation.id, {
			...data,
			payment_type: this.generateStringPaymentMethod(
				data.payment_type,
				data.store,
				data.va_numbers,
			).toUpperCase(),
			payment_code: this.generateStringPaymentCode(
				data.payment_type,
				data.va_numbers,
				this.generateStringBillerCode(
					data.payment_type,
					data.biller_code,
					data.bill_key,
					data.payment_code,
				),
			),
		});

		const status = this.parsePaymentStatusToConsultationStatus(
			data.transaction_status,
		);

		await this.repository.updateConsultationStatus(consultation.id, status);

		return data;
	}

	/**
	 *
	 * Generate string payment method.
	 *
	 * @param paymentType
	 * @param store
	 * @private
	 */
	private generateStringPaymentMethod(
		paymentType: string,
		store: string,
		va?: MidtransNotificationVANumber[],
	): string {
		if (paymentType === "echannel") return "Mandiri Bill";

		if (paymentType === "cstore") return store;

		if (paymentType === "bank_transfer" && va.length) return va[0].bank;

		return paymentType;
	}

	/**
	 *
	 * Generate string payment code.
	 *
	 * @param paymentType
	 * @param va
	 * @param defaultCode
	 * @private
	 */
	private generateStringPaymentCode(
		paymentType: string,
		va?: MidtransNotificationVANumber[],
		defaultCode?: string,
	): string | undefined {
		if (paymentType === "bank_transfer" && va.length) return va[0].va_number;

		return defaultCode;
	}

	private generateStringBillerCode(
		paymentType: string,
		billerCode?: string,
		billKey?: string,
		defaultCode?: string,
	): string | undefined {
		if (paymentType === "echannel") return `${billerCode} ${billKey}`;

		return defaultCode;
	}

	/**
	 *
	 * Parse payment status to consultation status.
	 *
	 * @param paymentStatus
	 * @private
	 */
	private parsePaymentStatusToConsultationStatus(
		paymentStatus: MidtransTransactionStatus,
	): TransactionStatus {
		switch (paymentStatus) {
			case MidtransTransactionStatus.CANCEL:
				return TransactionStatus.CANCELED_PAYMENT;
			case MidtransTransactionStatus.CAPTURE:
				return TransactionStatus.WAITING_CONFIRMATION;
			case MidtransTransactionStatus.SETTLEMENT:
				return TransactionStatus.WAITING_CONFIRMATION;
			case MidtransTransactionStatus.EXPIRE:
				return TransactionStatus.CANCELED_PAYMENT;
			case MidtransTransactionStatus.PENDING:
				return TransactionStatus.WAITING_PAYMENT;
			case MidtransTransactionStatus.DENY:
				return TransactionStatus.CANCELED_PAYMENT;
			default:
				return TransactionStatus.WAITING_PAYMENT;
		}
	}
}
