import { QueryFilterValidationMessage } from "@constant/message";
import { booleanStringTransformer, IndexPaginationRequest } from "@common";
import { IIndexPaginationOption } from "@contract";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class PatientNutritionistIndexQuery
	extends IndexPaginationRequest
	implements IIndexPaginationOption
{
	constructor() {
		super();
	}

	/**
	 *
	 * @description Include account
	 *
	 * @type {boolean}
	 *
	 */
	@Transform(booleanStringTransformer)
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
	@Transform(booleanStringTransformer)
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
	@Transform(booleanStringTransformer)
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
	@Transform(booleanStringTransformer)
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
	@Transform(booleanStringTransformer)
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
	@Transform(booleanStringTransformer)
	@IsBoolean({
		message:
			QueryFilterValidationMessage.ERR_SCHEDULE_BOOLEAN_FILTER_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	readonly schedules?: boolean;
}
