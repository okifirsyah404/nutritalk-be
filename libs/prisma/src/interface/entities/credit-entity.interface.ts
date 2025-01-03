import { Prisma } from "@prisma/client";
import { ICreditHistory } from "./credit-history-entity.interface";
import { IPatientEntity } from "./patient-entity.interface";

export interface ICredit extends Prisma.CreditGetPayload<{}> {
	creditHistories: ICreditHistory[];
	patient?: IPatientEntity | null;
}
