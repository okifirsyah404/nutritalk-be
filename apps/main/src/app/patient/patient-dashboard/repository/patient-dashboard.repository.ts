import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	IPatientDashboardConsultationResponse,
	IPatientEntity,
} from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";
import { Prisma, TransactionStatus } from "@prisma/client";

@Injectable()
export class PatientDashboardRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 *
	 * Find a patient by id.
	 *
	 * @param id - The id of the patient.
	 * @returns The patient entity.
	 *
	 */
	async findPatientById(id: string): Promise<IPatientEntity> {
		return this.prisma.patient
			.findUnique({
				where: {
					id: id,
				},
				select: {
					...PrismaSelector.PATIENT_WITH_PROFILE,
					account: {
						select: PrismaSelector.ACCOUNT,
					},
					credit: {
						select: PrismaSelector.CREDIT,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 *
	 * Count the number of finished consultations by patient id.
	 *
	 * @param patientId - The id of the patient.
	 * @returns The number of finished consultations.
	 *
	 */
	async countFinishedConsultationsByPatientId(
		patientId: string,
	): Promise<number> {
		return this.prisma.consultation.count({
			where: {
				patientId,
				status: TransactionStatus.FINISHED,
			},
		});
	}

	/**
	 *
	 * Count the number of ongoing consultations by patient id.
	 *
	 * @param patientId - The id of the patient.
	 * @returns The number of ongoing consultations.
	 *
	 */
	async findConsultationsByPatientId(
		patientId: string,
	): Promise<IPatientDashboardConsultationResponse> {
		return this.prisma.$transaction(async (trx) => {
			const selectConsultation: Prisma.ConsultationSelect = {
				...PrismaSelector.CONSULTATION,
				nutritionist: {
					select: PrismaSelector.NUTRITIONIST_WITH_PROFILE,
				},
				transactionPrice: {
					select: PrismaSelector.TRANSACTION_PRICE,
				},
				consultationTime: {
					select: PrismaSelector.CONSULTATION_TIME,
				},
				transactionPayment: {
					select: PrismaSelector.TRANSACTION_PAYMENT,
				},
				consultationReview: {
					select: PrismaSelector.CONSULTATION_REVIEW,
				},
			};

			const pendingConsultations = await trx.consultation.findMany({
				orderBy: {
					trId: "desc",
				},
				take: 3,
				where: {
					patientId: patientId,
					status: {
						in: [
							TransactionStatus.WAITING_PAYMENT,
							TransactionStatus.WAITING_CONFIRMATION,
						],
					},
				},
				select: selectConsultation,
			});

			const ongoingConsultations = await trx.consultation.findMany({
				orderBy: {
					trId: "desc",
				},
				take: 3,
				where: {
					patientId: patientId,
					status: TransactionStatus.ON_PROCESS,
				},
				select: selectConsultation,
			});

			const finishedConsultations = await trx.consultation.findMany({
				orderBy: {
					trId: "desc",
				},
				take: 3,
				where: {
					patientId: patientId,
					status: TransactionStatus.FINISHED,
				},
				select: selectConsultation,
			});

			return {
				pendingConsultations,
				ongoingConsultations,
				finishedConsultations,
			} as IPatientDashboardConsultationResponse;
		});
	}
}
