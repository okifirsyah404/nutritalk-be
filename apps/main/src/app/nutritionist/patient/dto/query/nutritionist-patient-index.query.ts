import {
	booleanStringTransformer,
	genderEnumStringTransformer,
	IndexPaginationRequest,
} from "@common";
import {
	ProfileValidationMessage,
	QueryFilterValidationMessage,
} from "@constant/message";
import { IIndexPaginationOption } from "@contract";
import { Gender } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

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
			case "name":
				return "profile.name";
			case "medicalRecord":
				return "medicalRecordKey.code";
			case "createdAt":
				return "createdAt";
			case "updatedAt":
				return "updatedAt";
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
