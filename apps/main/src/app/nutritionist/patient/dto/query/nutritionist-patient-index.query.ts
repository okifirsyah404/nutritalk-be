import { booleanStringTransformer, IndexPaginationRequest } from "@common";
import {
	IIndexPaginationOption,
	NutritionistPatientSortIndexQuery,
} from "@contract";
import { QueryFilterValidationMessage } from "@constant/message";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export class NutritionistPatientIndexQuery
	extends IndexPaginationRequest
	implements IIndexPaginationOption
{
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

	@Transform(booleanStringTransformer)
	@IsBoolean()
	@IsOptional()
	registered?: boolean;
}
