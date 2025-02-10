import { SortOrderEnum } from "@contract";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class DatabaseUtil {
	private readonly logger = new Logger(DatabaseUtil.name);

	getOrderBy(
		sortField: string,
		allowedFields: string[],
		sortOrder: SortOrderEnum,
	): Record<string, any> {
		this.logger.debug(
			`sortField: ${sortField}, allowedFields: ${allowedFields.join(", ")}, sortOrder: ${sortOrder}`,
		);

		// Validate sortField
		const validSortField =
			allowedFields.find((field) => field === sortField) || allowedFields[0];

		this.logger.debug(`validSortField: ${validSortField}`);

		// Split the field into parts for nested relations
		const parts = validSortField.split("."); // e.g., "profile.name" -> ["profile", "name"]

		this.logger.debug(`parts: ${parts.join(", ")}`);

		// Build nested orderBy object with sortOrder as the innermost value
		const result = parts
			.reverse()
			.reduce<
				Record<string, any>
			>((acc, part, index) => (index === 0 ? { [part]: sortOrder } : { [part]: acc }), {});

		this.logger.debug(`result: ${JSON.stringify(result)}`);

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
