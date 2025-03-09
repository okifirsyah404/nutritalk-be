import {
	booleanStringTransformer,
	consultationTypeEnumStringTransformer,
	genderEnumStringTransformer,
	IndexPaginationRequest,
	numberStringTransformer,
} from "@common";
import {
	ProfileValidationMessage,
	QueryFilterValidationMessage,
} from "@constant/message";
import { IIndexPaginationOption } from "@contract";
import { ConsultationType, Gender } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsOptional } from "class-validator";

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
	readonly withAccount?: boolean;

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
	readonly withConsultationMeta?: boolean;

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
	readonly withOccupation?: boolean;

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
	readonly withPrice?: boolean;

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
	readonly withRegistrationCertificate?: boolean;

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
	readonly withSchedules?: boolean;

	/**
	 *
	 * @description Include consultation type
	 *
	 * @type {boolean}
	 *
	 */
	@Transform(consultationTypeEnumStringTransformer)
	@IsEnum(ConsultationType, {
		message:
			QueryFilterValidationMessage.ERR_CONSULTATION_TYPE_FILTER_MUST_BE_ENUM,
	})
	@IsOptional()
	readonly consultationType: ConsultationType;

	/**
	 *
	 * @description Include Nutritionist gender
	 *
	 * @type {string}
	 *
	 */
	@Transform(genderEnumStringTransformer)
	@IsEnum(Gender, {
		message: ProfileValidationMessage.ERR_GENDER_INVALID,
	})
	@IsOptional()
	readonly gender?: Gender;

	/**
	 *
	 * @description Include min consultation fee
	 *
	 * @type {boolean}
	 *
	 */
	@Transform(numberStringTransformer)
	@IsInt({
		message: QueryFilterValidationMessage.ERR_MIN_PRICE_FILTER_MUST_BE_INT,
	})
	@IsOptional()
	readonly minPrice?: number;

	/**
	 *
	 * @description Include max consultation fee
	 *
	 * @type {boolean}
	 *
	 */
	@Transform(numberStringTransformer)
	@IsInt({
		message: QueryFilterValidationMessage.ERR_MAX_PRICE_FILTER_MUST_BE_INT,
	})
	@IsOptional()
	readonly maxPrice?: number;

	/**
	 *
	 * @description Include min experience
	 *
	 * @type {boolean}
	 *
	 */
	@Transform(numberStringTransformer)
	@IsInt({
		message: QueryFilterValidationMessage.ERR_MIN_PRICE_FILTER_MUST_BE_INT,
	})
	@IsOptional()
	readonly minExperience?: number;

	/**
	 *
	 * @description Include max experience
	 *
	 * @type {boolean}
	 *
	 */
	@Transform(numberStringTransformer)
	@IsInt({
		message: QueryFilterValidationMessage.ERR_MAX_PRICE_FILTER_MUST_BE_INT,
	})
	@IsOptional()
	readonly maxExperience?: number;
}
