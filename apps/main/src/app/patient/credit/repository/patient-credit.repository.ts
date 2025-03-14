import { PrismaSelector, PrismaService } from "@config/prisma";
import { ICreditEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientCreditRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findCreditByPatientId(patientId: string): Promise<ICreditEntity> {
		const credit = await this.prisma.credit
			.findUnique({
				where: {
					patientId,
				},
				select: PrismaSelector.CREDIT,
			})
			.catch(createDatabaseErrorHandler);

		return credit;
	}
}
