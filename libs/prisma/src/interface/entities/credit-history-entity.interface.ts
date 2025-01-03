import { Prisma } from "@prisma/client";
import { ICredit } from "./credit-entity.interface";

export interface ICreditHistory extends Prisma.CreditHistoryGetPayload<{}> {
	credit?: ICredit | null;
}
