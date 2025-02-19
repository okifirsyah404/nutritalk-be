import { IndexPaginationRequest } from "@common";
import { QueryFilterValidationMessage } from "@constant/message";
import {
	IIndexPaginationOption,
	NutritionistConsultationSortIndexQuery,
} from "@contract";
import { ConsultationType, TransactionStatus } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional } from "class-validator";

export class NutritionistConsultationIndexQuery
	extends IndexPaginationRequest
	implements IIndexPaginationOption
{
	@Transform(({ value }: { value: string }) => {
		switch (value) {
			case "createdAt":
				return NutritionistConsultationSortIndexQuery.CREATED_AT;
			case "updatedAt":
				return NutritionistConsultationSortIndexQuery.UPDATED_AT;
			case "status":
				return NutritionistConsultationSortIndexQuery.STATUS;
			case "type":
				return NutritionistConsultationSortIndexQuery.TYPE;
			case "startDate":
				return NutritionistConsultationSortIndexQuery.START_DATE;
			case "endDate":
				return NutritionistConsultationSortIndexQuery.END_DATE;
			case "patientName":
				return NutritionistConsultationSortIndexQuery.PATIENT_NAME;
			default:
				return undefined;
		}
	})
	@IsEnum(NutritionistConsultationSortIndexQuery, {
		message: QueryFilterValidationMessage.ERR_SORT_FILTER_INVALID,
	})
	@IsOptional()
	declare sort?: NutritionistConsultationSortIndexQuery;

	@Transform(({ value }: { value: string }) =>
		value != "" ? value.toUpperCase() : undefined,
	)
	@IsEnum(TransactionStatus, {
		message: QueryFilterValidationMessage.ERR_STATUS_FILTER_INVALID,
	})
	@IsOptional()
	readonly statusFilter?: TransactionStatus;

	@Transform(({ value }: { value: string }) =>
		value != "" ? value.toUpperCase() : undefined,
	)
	@IsEnum(ConsultationType, {
		message: QueryFilterValidationMessage.ERR_TYPE_FILTER_INVALID,
	})
	@IsOptional()
	readonly typeFilter?: ConsultationType;

	@Type(() => Date)
	@IsDate({
		message: QueryFilterValidationMessage.ERR_DATE_FILTER_MUST_BE_DATE,
	})
	@IsOptional()
	readonly startDateFilter?: Date;

	@Type(() => Date)
	@IsDate({
		message: QueryFilterValidationMessage.ERR_DATE_FILTER_MUST_BE_DATE,
	})
	@IsOptional()
	readonly endDateFilter?: Date;
}
