import { IndexPaginationRequest } from "@common";
import { QueryFilterValidationMessage } from "@constant/message";
import { IIndexPaginationOption } from "@contract";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class NutritionistIndexQuery
	extends IndexPaginationRequest
	implements IIndexPaginationOption
{
	constructor(
		consultationMeta: boolean = false,
		occupation: boolean = false,
		price: boolean = false,
		registrationCertificate: boolean = false,
		schedules: boolean = false,
		excludeSelf: boolean = false,
	) {
		super();

		this.consultationMeta = consultationMeta;
		this.occupation = occupation;
		this.price = price;
		this.registrationCertificate = registrationCertificate;
		this.schedules = schedules;
		this.excludeSelf = excludeSelf;
	}

	/**
	 *
	 * @description Include account
	 *
	 * @type {boolean}
	 *
	 */
	@Type(() => Boolean)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_ACCOUNT_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly account?: boolean;

	/**
	 *
	 * @description Include consultation meta
	 *
	 * @type {boolean}
	 *
	 */
	@Type(() => Boolean)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_CONSULTATION_META_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly consultationMeta?: boolean;

	/**
	 *
	 * @description Include occupation
	 *
	 * @type {boolean}
	 *
	 */
	@Type(() => Boolean)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_OCCUPATION_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly occupation?: boolean;

	/**
	 *
	 * @description Include price
	 *
	 * @type {boolean}
	 *
	 */
	@Type(() => Boolean)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_PROFILE_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly price?: boolean;

	/**
	 *
	 * @description Include registration certificate
	 *
	 * @type {boolean}
	 *
	 */
	@Type(() => Boolean)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_CERTIFICATE_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly registrationCertificate?: boolean;

	/**
	 *
	 * @description Include schedules
	 *
	 * @type {boolean}
	 *
	 */
	@Type(() => Boolean)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_SCHEDULE_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly schedules?: boolean;

	/**
	 *
	 * @description Exclude self
	 *
	 * @type {boolean}
	 *
	 */
	@Type(() => Boolean)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_EXCLUDE_SELF_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly excludeSelf?: boolean;
}
