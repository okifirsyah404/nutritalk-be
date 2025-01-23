import SortOrderEnum from "@contract/enum/sort-order.enum";
import { IIndexPaginationOption } from "@contract/request/index-pagination-option.interface";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, Max } from "class-validator";

export class IndexPaginationRequest implements IIndexPaginationOption {
	@IsOptional()
	search?: string;

	@IsOptional()
	sort?: string;

	@IsEnum(SortOrderEnum)
	@IsOptional()
	order?: SortOrderEnum = SortOrderEnum.ASC;

	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	page: number = 1;

	@Type(() => Number)
	@Max(100)
	@IsNumber()
	@IsOptional()
	limit: number = 10;
}
