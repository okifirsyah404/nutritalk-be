import SortOrderEnum from "@contract/enum/sort-order.enum";
import { IPaginationOption } from "@contract/pagination/pagination.interface";

export interface IIndexPaginationOption extends IPaginationOption {
	search?: string;
	sort?: string;
	order?: SortOrderEnum;
}
