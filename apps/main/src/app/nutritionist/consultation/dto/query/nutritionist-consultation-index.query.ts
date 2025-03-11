import { IndexPaginationRequest } from "@common";
import { QueryFilterValidationMessage } from "@constant/message";
import { IIndexPaginationOption } from "@contract";
import { ConsultationType, TransactionStatus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";

export class NutritionistConsultationIndexQuery
	extends IndexPaginationRequest
	implements IIndexPaginationOption
{
	/**
	 * @description Sort by field
	 *
	 * @type {NutritionistConsultationSortIndexQuery}
	 */
	@Transform(({ value }: { value: string }) => {
		switch (value) {
			case "transactionId":
				return "trId";
			case "createdAt":
				return "createdAt";
			case "updatedAt":
				return "updatedAt";
			case "status":
				return "status";
			case "type":
				return "type";
			case "startDate":
				return "consultationTime.start";
			case "endDate":
				return "consultationTime.end";
			case "patientName":
				return "patient.profile.name";
			default:
				return undefined;
		}
	})
	@IsString({
		message: QueryFilterValidationMessage.ERR_SORT_FILTER_INVALID,
	})
	@IsOptional()
	declare sort?: string;

	/**
	 *
	 * @description Filter by status
	 *
	 * @type {TransactionStatus}
	 *
	 */
	@Transform(({ value }: { value: string }) =>
		value != "" ? value.toUpperCase() : undefined,
	)
	@IsEnum(TransactionStatus, {
		message: QueryFilterValidationMessage.ERR_STATUS_FILTER_INVALID,
	})
	@IsOptional()
	readonly statusFilter?: TransactionStatus;

	/**
	 *
	 * @description Filter by type
	 *
	 * @type {ConsultationType}
	 *
	 */
	@Transform(({ value }: { value: string }) =>
		value != "" ? value.toUpperCase() : undefined,
	)
	@IsEnum(ConsultationType, {
		message: QueryFilterValidationMessage.ERR_TYPE_FILTER_INVALID,
	})
	@IsOptional()
	readonly typeFilter?: ConsultationType;

	/**
	 *
	 * @description Filter by start date
	 *
	 * @type {Date}
	 *
	 */
	@Transform(({ value }: { value: string }): Date | undefined =>
		value != "" ? new Date(value) : undefined,
	)
	@IsDate({
		message: QueryFilterValidationMessage.ERR_DATE_START_FILTER_MUST_BE_DATE,
	})
	@IsOptional()
	readonly startDateFilter?: Date;

	/**
	 *
	 * @description Filter by end date
	 *
	 * @type {Date}
	 *
	 */
	@Transform(({ value }: { value: string }): Date | undefined =>
		value != "" ? new Date(value) : undefined,
	)
	@IsDate({
		message: QueryFilterValidationMessage.ERR_DATE_END_FILTER_MUST_BE_DATE,
	})
	@IsOptional()
	readonly endDateFilter?: Date;
}
