export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginationMeta extends IPaginationOptions {
  totalItems: number;
  totalPages: number;
}
