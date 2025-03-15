import {
	IConsultationEntity,
	IConsultationTimeEntity,
	ITransactionPriceEntity,
} from "@contract";
import { PaymentSource } from "@prisma/client";

export interface ICreateConsultationOrder
	extends Pick<
			IConsultationEntity,
			"patientId" | "nutritionistId" | "type" | "patientNote"
		>,
		Pick<IConsultationTimeEntity, "start" | "end">,
		Pick<ITransactionPriceEntity, "price" | "subTotal" | "total"> {
	paymentSource: PaymentSource;
	duration: number;
}

export interface ICreateConsultationOrderRequest
	extends Pick<
			IConsultationEntity,
			"patientId" | "nutritionistId" | "type" | "patientNote"
		>,
		Pick<IConsultationTimeEntity, "start" | "end"> {
	paymentSource: PaymentSource;
	duration: number;
}

export interface ICreateConsultationOrderResponse {
	consultation: IConsultationEntity;
	midtransSnapToken?: string;
	midtransRedirectUrl?: string;
}
