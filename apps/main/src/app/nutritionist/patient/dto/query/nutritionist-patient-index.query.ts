import {
	booleanStringTransformer,
	genderEnumStringTransformer,
	IndexPaginationRequest,
} from "@common";
import {
	ProfileValidationMessage,
	QueryFilterValidationMessage,
} from "@constant/message";
import {
	IIndexPaginationOption,
	NutritionistPatientSortIndexQuery,
} from "@contract";
import { Gender } from "@prisma/client";
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
				return "createdAt";
			case "updatedAt":
				return "updatedAt";
			case "medicalRecord":
				return "medicalRecordKey.code";
			case "name":
				return "profile.name";
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

	/**
	 *
	 * @description Include Nutritionist gender
	 *
	 * @type {string}
	 *
	 */
	@Transform(genderEnumStringTransformer)
	@IsEnum(Gender, {
		message: ProfileValidationMessage.ERR_GENDER_INVALID,
	})
	@IsOptional()
	readonly gender?: Gender;
}
