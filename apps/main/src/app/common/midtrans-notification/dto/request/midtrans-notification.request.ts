// payment_type
// payment_code
// transaction_status
// transaction_time

import { IsDate, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { MidtransTransactionStatus } from "@contract";
import { Transform, Type } from "class-transformer";
import { midtransTransactionStatusEnumStringTransformer } from "@common";

export class MidtransNotificationRequest {
	@IsNotEmpty()
	order_id: string;

	@Transform(midtransTransactionStatusEnumStringTransformer)
	@IsEnum(MidtransTransactionStatus)
	@IsNotEmpty()
	transaction_status: MidtransTransactionStatus;

	@IsNotEmpty()
	payment_type: string;

	@IsOptional()
	store: string;

	@IsOptional()
	va_numbers?: MidtransNotificationVANumber[];

	@IsOptional()
	payment_code: string;

	@Type(() => Date)
	@IsDate()
	@IsOptional()
	transaction_time: Date;

	@IsOptional()
	biller_code?: string;

	@IsOptional()
	bill_key?: string;
}

export class MidtransNotificationVANumber {
	va_number: string;
	bank: string;
}
