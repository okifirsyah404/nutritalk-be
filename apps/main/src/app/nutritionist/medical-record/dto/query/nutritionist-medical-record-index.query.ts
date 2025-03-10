import { IndexPaginationRequest } from "@common";
import { QueryFilterValidationMessage } from "@constant/message";
import { IIndexPaginationOption } from "@contract";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class NutritionistMedicalRecordIndexQuery
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
			case "medicalRecord":
				return "code";
			case "name":
				return "patient.profile.name";
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
}
