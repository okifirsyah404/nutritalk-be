import moment, { Moment } from "moment";

interface ITimeRange {
	start: Moment;
	end: Moment;
}

interface ITimeRangeWithinOptions {
	excludeStart?: boolean;
	excludeEnd?: boolean;
}

export class TimeRange implements ITimeRange {
	start: Moment;
	end: Moment;

	constructor(start: Moment, end: Moment) {
		const baseDate = "1970-01-01T00:00:00.000Z";
		const _start = moment(baseDate).set({
			hour: start.hour(),
			minute: start.minute(),
			second: start.second(),
		});
		const _end = moment(baseDate).set({
			hour: end.hour(),
			minute: end.minute(),
			second: end.second(),
		});

		if (_start.isAfter(_end)) {
			this.start = _end;
			this.end = _start;
		} else {
			this.start = _start;
			this.end = _end;
		}
	}

	contains(time: string): boolean {
		const checkTime = moment("1970-01-01T" + time + "Z");
		return checkTime.isBetween(this.start, this.end, undefined, "[]");
	}

	within(range: TimeRange, options?: ITimeRangeWithinOptions): boolean {
		if (options?.excludeStart && options?.excludeEnd) {
			return range.start.isAfter(this.start) && range.end.isBefore(this.end);
		}
		if (options?.excludeStart) {
			return (
				range.start.isAfter(this.start) && range.end.isSameOrBefore(this.end)
			);
		}
		if (options?.excludeEnd) {
			return (
				range.start.isSameOrAfter(this.start) && range.end.isBefore(this.end)
			);
		}
		return (
			range.start.isSameOrBefore(this.start) &&
			range.end.isSameOrAfter(this.end)
		);
	}

	intersects(range: TimeRange): boolean {
		return range.start.isBefore(this.end) && range.end.isAfter(this.start);
	}

	intersectsOthers(ranges: TimeRange[]): boolean {
		return ranges.some((range) => this.intersects(range));
	}

	overlaps(range: TimeRange): boolean {
		return range.start.isBefore(this.end) && range.end.isAfter(this.start);
	}

	overlapsOthers(ranges: TimeRange[]): boolean {
		return ranges.some((range) => this.overlaps(range));
	}

	equals(range: TimeRange): boolean {
		return this.start.isSame(range.start) && this.end.isSame(range.end);
	}

	diff(unit: moment.unitOfTime.Diff): number {
		return this.end.diff(this.start, unit);
	}

	static fromNow(end: string): TimeRange {
		return new TimeRange(
			moment("1970-01-01T00:00:00.000Z"),
			moment("1970-01-01T" + end + "Z"),
		);
	}

	static untilNow(start: string): TimeRange {
		return new TimeRange(
			moment("1970-01-01T" + start + "Z"),
			moment("1970-01-01T00:00:00.000Z"),
		);
	}

	static fromInterval(
		start: string,
		interval: number,
		unit: moment.unitOfTime.DurationConstructor,
	): TimeRange {
		const baseDate = "1970-01-01T" + start + "Z";
		const newEnd = moment(baseDate).add(interval, unit);
		return new TimeRange(moment(baseDate), newEnd);
	}

	static fromDates(start: Date, end: Date): TimeRange {
		return new TimeRange(moment(start), moment(end));
	}
}
