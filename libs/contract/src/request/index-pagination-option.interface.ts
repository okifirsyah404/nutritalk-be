import { SortOrderEnum } from "../enum/sort-order.enum";
import { IPaginationOption } from "../pagination/pagination.interface";

export interface IIndexPaginationOption extends IPaginationOption {
	search?: string;
	sort?: string;
	order?: SortOrderEnum;
}
