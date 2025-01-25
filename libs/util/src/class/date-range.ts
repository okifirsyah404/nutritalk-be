import moment, { Moment } from "moment";

interface IDateRange {
	start: Moment;
	end: Moment;
}

interface IDateRangeWithinOptions {
	excludeStart?: boolean;
	excludeEnd?: boolean;
}

export class DateRange implements IDateRange {
	start: Moment;
	end: Moment;

	constructor(start: Moment, end: Moment) {
		if (start.isAfter(end)) {
			this.start = end;
			this.end = start;
		} else {
			this.start = start;
			this.end = end;
		}
	}

	setStart(date: Moment): void {
		this.start = date;
	}

	setEnd(date: Moment): void {
		this.end = date;
	}

	contains(date: Moment): boolean {
		return date.isBetween(this.start, this.end, undefined, "[]");
	}

	within(
		range: DateRange,
		{
			excludeStart = false,
			excludeEnd = false,
		}: IDateRangeWithinOptions | undefined,
	): boolean {
		const startOp = excludeStart ? "isAfter" : "isSameOrAfter";
		const endOp = excludeEnd ? "isBefore" : "isSameOrBefore";

		return range.start[startOp](this.start) && range.end[endOp](this.end);
	}

	intersects(range: DateRange): boolean {
		return (
			range.start.isSameOrBefore(this.end) &&
			range.end.isSameOrAfter(this.start)
		);
	}

	intersectsOthers(ranges: DateRange[]): boolean {
		return ranges.some((range) => range.intersects(this));
	}

	overlaps(range: DateRange): boolean {
		return range.start.isBefore(this.end) && range.end.isAfter(this.start);
	}

	overlapsOthers(ranges: DateRange[]): boolean {
		return ranges.some((range) => range.overlaps(this));
	}

	equals(range: DateRange): boolean {
		return range.start.isSame(this.start) && range.end.isSame(this.end);
	}

	diff(unit: moment.unitOfTime.Diff): number {
		return this.end.diff(this.start, unit);
	}

	static fromDates(start: Date, end: Date): DateRange {
		return new DateRange(moment(start), moment(end));
	}

	static fromNow(end: Moment): DateRange {
		return new DateRange(moment(), end);
	}

	static untilNow(start: Moment): DateRange {
		return new DateRange(start, moment());
	}

	static fromInterval(
		start: Moment,
		interval: number,
		unit: moment.unitOfTime.DurationConstructor,
	): DateRange {
		return new DateRange(start, moment(start).add(interval, unit));
	}
}
