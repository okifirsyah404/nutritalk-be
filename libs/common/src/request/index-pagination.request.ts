import { IIndexPaginationOption, SortOrderEnum } from "@contract";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, Max } from "class-validator";
export class IndexPaginationRequest implements IIndexPaginationOption {
	@IsOptional()
	search?: string;

	@IsOptional()
	sort?: string;

	@Transform(({ value }): string | undefined => (value === "" ? "asc" : value))
	@IsEnum(SortOrderEnum)
	@IsOptional()
	order: SortOrderEnum = SortOrderEnum.ASC;

	@Transform(({ value }) => {
		if (value === "") {
			return 1;
		}
		return Number(value);
	})
	@IsNumber()
	@IsOptional()
	page: number = 1;

	@Transform(({ value }) => {
		if (value === "") {
			return 10;
		}
		return Number(value);
	})
	@Max(100)
	@IsNumber()
	@IsOptional()
	limit: number = 10;
}
