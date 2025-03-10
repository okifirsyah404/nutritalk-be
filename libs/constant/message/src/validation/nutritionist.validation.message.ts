export abstract class NutritionistValidationMessage {
	static readonly ERR_NIDN_INVALID = "ERR_NIDN_INVALID";
	static readonly ERR_NIDN_REQUIRED = "ERR_NIDN_REQUIRED";
	static readonly ERR_NIDN_MUST_BE_STRING = "ERR_NIDN_MUST_BE_STRING";

	static readonly ERR_NIP_INVALID = "ERR_NIP_INVALID";
	static readonly ERR_NIP_REQUIRED = "ERR_NIP_REQUIRED";
	static readonly ERR_NIP_MUST_BE_STRING = "ERR_NIP_MUST_BE_STRING";

	static readonly ERR_REGISTRATION_NUMBER_REQUIRED =
		"ERR_REGISTRATION_NUMBER_REQUIRED";
	static readonly ERR_REGISTRATION_NUMBER_MUST_BE_STRING =
		"ERR_REGISTRATION_NUMBER_MUST_BE_STRING";
	static readonly ERR_REGISTRATION_NUMBER_INVALID =
		"ERR_REGISTRATION_NUMBER_INVALID";

	static readonly ERR_ISSUE_DATE_REQUIRED = "ERR_ISSUE_DATE_REQUIRED";
	static readonly ERR_ISSUE_DATE_MUST_BE_DATE = "ERR_ISSUE_DATE_MUST_BE_DATE";
	static readonly ERR_ISSUE_DATE_INVALID = "ERR_ISSUE_DATE_INVALID";

	static readonly ERR_VALID_UNTIL_REQUIRED = "ERR_VALID_UNTIL_REQUIRED";
	static readonly ERR_VALID_UNTIL_MUST_BE_DATE = "ERR_VALID_UNTIL_MUST_BE_DATE";
	static readonly ERR_VALID_UNTIL_INVALID = "ERR_VALID_UNTIL_INVALID";

	static readonly ERR_ONLINE_PRICE_REQUIRED = "ERR_ONLINE_PRICE_REQUIRED";
	static readonly ERR_ONLINE_PRICE_INVALID = "ERR_ONLINE_PRICE_INVALID";
	static readonly ERR_ONLINE_PRICE_MUST_BE_NUMBER =
		"ERR_ONLINE_PRICE_MUST_BE_NUMBER";
	static readonly ERR_ONLINE_PRICE_MIN_50000 = "ERR_ONLINE_PRICE_MIN_50000";
	static readonly ERR_ONLINE_PRICE_MAX_10000000 =
		"ERR_ONLINE_PRICE_MAX_10000000";

	static readonly ERR_OFFLINE_PRICE_REQUIRED = "ERR_OFFLINE_PRICE_REQUIRED";
	static readonly ERR_OFFLINE_PRICE_INVALID = "ERR_OFFLINE_PRICE_INVALID";
	static readonly ERR_OFFLINE_PRICE_MUST_BE_NUMBER =
		"ERR_OFFLINE_PRICE_MUST_BE_NUMBER";
	static readonly ERR_OFFLINE_PRICE_MIN_50000 = "ERR_OFFLINE_PRICE_MIN_50000";
	static readonly ERR_OFFLINE_PRICE_MAX_10000000 =
		"ERR_OFFLINE_PRICE_MAX_10000000";

	static readonly ERR_START_REQUIRED = "ERR_START_REQUIRED";
	static readonly ERR_START_MUST_BE_DATE = "ERR_START_MUST_BE_DATE";
	static readonly ERR_END_REQUIRED = "ERR_END_REQUIRED";
	static readonly ERR_END_MUST_BE_DATE = "ERR_END_MUST_BE_DATE";
	static readonly ERR_END_MUST_BE_AFTER_START = "ERR_END_MUST_BE_AFTER_START";
	static readonly ERR_START_MUST_BE_BEFORE_END = "ERR_START_MUST_BE_BEFORE_END";

	static readonly ERR_MIN_TIME_7_AM_WIB = "ERR_MIN_TIME_7_AM_WIB";
	static readonly ERR_MAX_TIME_7_PM_WIB = "ERR_MAX_TIME_7_PM_WIB";
	static readonly ERR_MIN_START_TIME_7_AM_WIB = "ERR_MIN_START_TIME_7_AM_WIB";
	static readonly ERR_MAX_START_TIME_7_PM_WIB = "ERR_MAX_START_TIME_7_PM_WIB";
	static readonly ERR_MAX_END_TIME_7_PM_WIB = "ERR_MAX_END_TIME_7_PM_WIB";
	static readonly ERR_MIN_END_TIME_7_AM_WIB = "ERR_MIN_END_TIME_7_AM_WIB";

	static readonly ERR_TIME_REQUIRED = "ERR_TIME_REQUIRED";
	static readonly ERR_TIME_MUST_BE_DATE = "ERR_TIME_MUST_BE_DATE";
	static readonly ERR_TIME_MUST_BE_VALID = "ERR_TIME_MUST_BE_VALID";
	static readonly ERR_TIME_NOT_IN_RANGE = "ERR_TIME_NOT_IN_RANGE";

	static readonly ERR_START_TIME_REQUIRED = "ERR_START_TIME_REQUIRED";
	static readonly ERR_START_TIME_MUST_BE_DATE = "ERR_START_TIME_MUST_BE_DATE";
	static readonly ERR_START_TIME_MUST_BE_VALID = "ERR_START_TIME_MUST_BE_VALID";

	static readonly ERR_END_TIME_REQUIRED = "ERR_END_TIME_REQUIRED";
	static readonly ERR_END_TIME_MUST_BE_DATE = "ERR_END_TIME_MUST_BE_DATE";
	static readonly ERR_END_TIME_MUST_BE_VALID = "ERR_END_TIME_MUST_BE_VALID";

	static readonly ERR_TIME_RANGE_REQUIRED = "ERR_TIME_RANGE_REQUIRED";
	static readonly ERR_TIME_RANGE_MUST_BE_ARRAY = "ERR_TIME_RANGE_MUST_BE_ARRAY";
	static readonly ERR_TIME_RANGE_MUST_BE_VALID = "ERR_TIME_RANGE_MUST_BE_VALID";
	static readonly ERR_TIME_RANGE_OVERLAP = "ERR_TIME_RANGE_OVERLAP";

	static readonly ERR_MAX_TIME_RANGE_3 = "ERR_MAX_TIME_RANGE_3";

	static readonly ERR_WORK_PLACE_MUST_BE_STRING =
		"ERR_WORK_PLACE_MUST_BE_STRING";
	static readonly ERR_WORK_PLACE_REQUIRED = "ERR_WORK_PLACE_REQUIRED";

	static readonly ERR_EXPERIENCE_MUST_BE_INT = "ERR_EXPERIENCE_MUST_BE_INT";
	static readonly ERR_EXPERIENCE_REQUIRED = "ERR_EXPERIENCE_REQUIRED";

	static readonly ERR_IS_AUTO_AVAILABLE_REQUIRED =
		"ERR_IS_AUTO_AVAILABLE_REQUIRED";
	static readonly ERR_IS_AUTO_AVAILABLE_MUST_BE_BOOLEAN =
		"ERR_IS_AUTO_AVAILABLE_MUST_BE_BOOLEAN";
}
