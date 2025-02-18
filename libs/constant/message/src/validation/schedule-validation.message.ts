export abstract class ScheduleValidationMessage {
	static readonly ERR_START_REQUIRED = "ERR_START_REQUIRED";
	static readonly ERR_START_MUST_BE_DATE = "ERR_START_MUST_BE_DATE";
	static readonly ERR_END_REQUIRED = "ERR_END_REQUIRED";
	static readonly ERR_END_MUST_BE_DATE = "ERR_END_MUST_BE_DATE";
	static readonly ERR_END_MUST_BE_AFTER_START = "ERR_END_MUST_BE_AFTER_START";
	static readonly ERR_START_MUST_BE_BEFORE_END = "ERR_START_MUST_BE_BEFORE_END";
}
