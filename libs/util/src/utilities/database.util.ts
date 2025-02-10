import { SortOrderEnum } from "@contract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseUtil {
	getOrderBy(
		sortField: string,
		allowedFields: string[],
		sortOrder: SortOrderEnum,
	): Record<string, any> {
		// Validate sortField
		const validSortField =
			allowedFields.find((field) => field === sortField) || allowedFields[0];

		// Split the field into parts for nested relations
		const parts = validSortField.split("."); // e.g., "profile.name" -> ["profile", "name"]

		// Build nested orderBy object with sortOrder as the innermost value
		const result = parts
			.reverse()
			.reduce<
				Record<string, any>
			>((acc, part, index) => (index === 0 ? { [part]: sortOrder } : { [part]: acc }), {});

		return result;
	}

	static getOrderBy(
		sortField: string,
		allowedFields: string[],
		sortOrder: SortOrderEnum,
	): Record<string, any> {
		return new DatabaseUtil().getOrderBy(sortField, allowedFields, sortOrder);
	}
}
