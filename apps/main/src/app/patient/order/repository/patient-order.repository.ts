import { PrismaService } from "@config/prisma";
import { ICheckOrderScheduleOverlaps, IConsultationEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";
import { TransactionStatus } from "@prisma/client";

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
}
