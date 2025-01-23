export interface IPaginationOption {
	page: number;
	limit: number;
}

export interface IPaginationMeta extends IPaginationOption {
	totalItems: number;
	totalPages: number;
}

export interface IPaginationResult<T> {
	pagination: IPaginationMeta;
	items: T[];
}
