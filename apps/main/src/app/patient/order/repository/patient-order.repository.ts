import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	ICheckOrderScheduleOverlaps,
	IConsultationEntity,
	ICreateConsultationOrder,
	INutritionistEntity,
	ITransactionPaymentEntity,
} from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";
import { CreditAction, PaymentSource, TransactionStatus } from "@prisma/client";

@Injectable()
export class PatientOrderRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Get the consultation that overlaps with the given date range.
	 * @param nutritionistId - The ID of the nutritionist.
	 * @param startDate - The start date of the consultation.
	 * @param endDate - The end date of the consultation.
	 * @returns The overlapping consultation entity or null if none found.
	 */
	async getOverlapsConsultation({
		nutritionistId,
		start: startDate,
		end: endDate,
		type,
	}: ICheckOrderScheduleOverlaps): Promise<IConsultationEntity> {
		return this.prisma.consultation
			.findFirst({
				where: {
					nutritionistId,
					type,
					status: {
						in: [
							TransactionStatus.WAITING_CONFIRMATION,
							TransactionStatus.SCHEDULED,
							TransactionStatus.RE_SCHEDULED,
							TransactionStatus.ON_PROCESS,
						],
					},
					consultationTime: {
						start: {
							lte: endDate,
						},
						end: {
							gte: startDate,
						},
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Find a nutritionist by ID.
	 * @param nutritionistId - The ID of the nutritionist.
	 * @returns The nutritionist entity.
	 */
	async findNutritionistById(
		nutritionistId: string,
	): Promise<INutritionistEntity> {
		const result = await this.prisma.nutritionist
			.findUnique({
				where: {
					id: nutritionistId,
				},
				select: {
					...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					price: {
						select: PrismaSelector.PRICE,
					},
				},
			})
			.catch(createDatabaseErrorHandler);

		return result;
	}

	/**
	 * Create a new consultation order.
	 * @param patientId - The ID of the patient.
	 * @param nutritionistId - The ID of the nutritionist.
	 * @param type - The type of the consultation.
	 * @param patientNote - The note from the patient.
	 * @param start - The start date of the consultation.
	 * @param end - The end date of the consultation.
	 * @param paymentSource - The payment source.
	 * @param price - The price of the consultation.
	 * @param subTotal - The sub total of the consultation.
	 * @param total - The total price of the consultation.
	 * @returns The created consultation entity.
	 */
	async createConsultationOrder({
		patientId,
		nutritionistId,
		type,
		patientNote,
		start,
		end,
		paymentSource,
		price,
		subTotal,
		total,
		duration,
	}: ICreateConsultationOrder): Promise<IConsultationEntity> {
		const result = await this.prisma
			.$transaction(async (trx) => {
				const isUsingCredit = paymentSource === PaymentSource.CREDIT;

				const status = isUsingCredit
					? TransactionStatus.WAITING_CONFIRMATION
					: TransactionStatus.WAITING_PAYMENT;

				const consultationTime = await trx.consultationTime.create({
					data: {
						start,
						end,
						duration,
					},
					select: PrismaSelector.CONSULTATION_TIME,
				});

				const transactionPrice = await trx.transactionPrice.create({
					data: {
						sources: [paymentSource],
						price,
						subTotal,
						total,
						credit: isUsingCredit ? total : 0,
					},
					select: PrismaSelector.TRANSACTION_PRICE,
				});

				const transactionPayment = await trx.transactionPayment.create({
					data: {
						method: isUsingCredit ? PaymentSource.CREDIT.toString() : null,
					},
					select: PrismaSelector.TRANSACTION_PAYMENT,
				});

				const consultation = await trx.consultation.create({
					data: {
						type,
						patientNote,
						status: status,
						patient: {
							connect: {
								id: patientId,
							},
						},
						nutritionist: {
							connect: {
								id: nutritionistId,
							},
						},
						consultationTime: {
							connect: {
								id: consultationTime.id,
							},
						},
						transactionPrice: {
							connect: {
								id: transactionPrice.id,
							},
						},
						transactionPayment: {
							connect: {
								id: transactionPayment.id,
							},
						},
					},
					select: {
						...PrismaSelector.CONSULTATION,
						consultationTime: {
							select: PrismaSelector.CONSULTATION_TIME,
						},
						transactionPrice: {
							select: PrismaSelector.TRANSACTION_PRICE,
						},
						transactionPayment: {
							select: PrismaSelector.TRANSACTION_PAYMENT,
						},
					},
				});

				if (isUsingCredit) {
					const credit = await trx.credit.findUnique({
						where: {
							patientId,
						},
						select: {
							id: true,
							balance: true,
						},
					});

					await trx.credit.update({
						where: {
							id: credit.id,
						},
						data: {
							balance: {
								decrement: total,
							},
						},
					});

					await trx.creditHistory.create({
						data: {
							creditId: credit.id,
							action: CreditAction.PAY_CONSULTATION,
							amount: total,
							note: `Payment for consultation ${consultation.trId}`,
						},
					});
				}

				return consultation;
			})
			.catch(createDatabaseErrorHandler);

		return result;
	}

	/**
	 * Update the transaction payment details.
	 * @param consultationId - The ID of the consultation.
	 * @param midtransSnapToken - The midtrans snap token.
	 * @param midtransRedirectUrl - The midtrans redirect URL.
	 * @param method - The payment method.
	 * @param code - The payment code.
	 * @param status - The payment status.
	 * @param date - The payment date.
	 * @returns The updated transaction payment entity.
	 */
	async updateTransactionPayment({
		consultationId,
		midtransSnapToken,
		midtransRedirectUrl,
		method,
		code,
		status,
		date,
	}: Partial<ITransactionPaymentEntity>): Promise<ITransactionPaymentEntity> {
		const result = await this.prisma.transactionPayment
			.update({
				where: {
					consultationId,
				},
				data: {
					midtransSnapToken,
					midtransRedirectUrl,
					method,
					code,
					status,
					date,
				},
				select: PrismaSelector.TRANSACTION_PAYMENT,
			})
			.catch(createDatabaseErrorHandler);

		return result;
	}
}
