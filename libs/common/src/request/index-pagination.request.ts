import { QueryFilterValidationMessage } from "@constant/message";
import { IIndexPaginationOption, SortOrderEnum } from "@contract";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max } from "class-validator";
export class IndexPaginationRequest implements IIndexPaginationOption {
	@IsOptional()
	search?: string;

	@IsOptional()
	sort?: string;

	@Transform(({ value }): string | undefined => (value === "" ? "asc" : value))
	@IsEnum(SortOrderEnum, {
		message: QueryFilterValidationMessage.ERR_ORDER_INVALID,
	})
	@IsOptional()
	order: SortOrderEnum = SortOrderEnum.ASC;

	@Transform(({ value }) => {
		if (value === "") {
			return 1;
		}
		return Number(value);
	})
	@IsInt({
		message: QueryFilterValidationMessage.ERR_PAGE_MUST_BE_INT,
	})
	@IsOptional()
	page: number = 1;

	@Transform(({ value }) => {
		if (value === "") {
			return 10;
		}
		return Number(value);
	})
	@Max(100, {
		message: QueryFilterValidationMessage.ERR_LIMIT_MAX_100,
	})
	@IsInt({
		message: QueryFilterValidationMessage.ERR_LIMIT_MUST_BE_INT,
	})
	@IsOptional()
	limit: number = 10;
}
