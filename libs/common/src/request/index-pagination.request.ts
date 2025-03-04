import { QueryFilterValidationMessage } from "@constant/message";
import { IIndexPaginationOption, SortOrderEnum } from "@contract";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max } from "class-validator";
export class IndexPaginationRequest implements IIndexPaginationOption {
	/**
	 *
	 * @description Search query
	 *
	 * @type {string}
	 *
	 */
	@IsOptional()
	search?: string;

	/**
	 *
	 * @description Sort by field
	 *
	 * @type {string}
	 *
	 */
	@IsOptional()
	sort?: string;

	/**
	 *
	 * @description Sort order
	 *
	 * @type {SortOrderEnum}
	 *
	 */
	@Transform(({ value }): string | undefined => (value === "" ? "asc" : value))
	@IsEnum(SortOrderEnum, {
		message: QueryFilterValidationMessage.ERR_ORDER_INVALID,
	})
	@IsOptional()
	order: SortOrderEnum = SortOrderEnum.ASC;

	/**
	 *
	 * @description Page number
	 *
	 * @type {number}
	 *
	 */
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

	/**
	 *
	 * @description Limit number
	 *
	 * @type {number}
	 * @default 10
	 * @maximum 100
	 * @minimum 1
	 */
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
