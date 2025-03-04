/* eslint-disable @typescript-eslint/no-unsafe-return */
import { booleanStringTransformer, IndexPaginationRequest } from "@common";
import { QueryFilterValidationMessage } from "@constant/message";
import {
	IIndexPaginationOption,
	NutritionistPatientSortIndexQuery,
} from "@contract";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export class NutritionistPatientIndexQuery
	extends IndexPaginationRequest
	implements IIndexPaginationOption
{
	/**
	 * @description Sort by field
	 *
	 * @type {NutritionistPatientSortIndexQuery}
	 *
	 */
	@Transform(({ value }: { value: string }) => {
		switch (value) {
			case "createdAt":
				return NutritionistPatientSortIndexQuery.CREATED_AT;
			case "updatedAt":
				return NutritionistPatientSortIndexQuery.UPDATED_AT;
			case "medicalRecord":
				return NutritionistPatientSortIndexQuery.MEDICAL_RECORD;
			case "name":
				return NutritionistPatientSortIndexQuery.NAME;
			default:
				return undefined;
		}
	})
	@IsEnum(NutritionistPatientSortIndexQuery, {
		message: QueryFilterValidationMessage.ERR_SORT_FILTER_INVALID,
	})
	@IsOptional()
	declare sort?: NutritionistPatientSortIndexQuery;

	/**
	 *
	 * @description Filter by registered
	 *
	 * @type {boolean}
	 *
	 */
	@Transform(booleanStringTransformer)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_REGISTERED_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	registered?: boolean;
}
