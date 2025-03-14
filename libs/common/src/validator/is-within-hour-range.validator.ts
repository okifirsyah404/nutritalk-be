import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import moment from "moment-timezone";

@ValidatorConstraint({ async: false })
export class IsWithinHourRangeConstraint
	implements ValidatorConstraintInterface
{
	validate(value: Date): boolean {
		if (!moment(value).isValid()) return false;

		// Convert UTC to WIB (Asia/Jakarta)
		const hour = moment(value).tz("Asia/Jakarta").hour();

		return hour >= 7 && hour <= 19; // Allowed between 07:00 and 19:00 WIB
	}

	defaultMessage(): string {
		return "Time must be between 08:00 and 18:00";
	}
}

export function IsWithinHourRange(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string): void {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsWithinHourRangeConstraint,
		});
	};
}

@ValidatorConstraint({ async: false })
export class IsSpecificHourConstraint implements ValidatorConstraintInterface {
	private readonly targetHour: number;

	constructor(targetHour?: number) {
		this.targetHour = targetHour ?? 7; // Default to 7 AM WIB if not specified
	}

	validate(value: Date): boolean {
		if (!moment(value).isValid()) return false;

		// Convert UTC to WIB (Asia/Jakarta)
		const hour = moment(value).tz("Asia/Jakarta").hour();

		return hour === this.targetHour;
	}

	defaultMessage(): string {
		return `Time must be exactly at ${this.targetHour}:00 WIB`;
	}
}

export function IsSpecificHour(
	hour: number,
	validationOptions?: ValidationOptions,
) {
	return function (object: object, propertyName: string): void {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [hour],
			validator: {
				validate(value: any) {
					if (!moment(value).isValid()) return false;

					// Convert UTC to WIB
					const convertedHour = moment(value).tz("Asia/Jakarta").hour();
					return convertedHour === hour;
				},
				defaultMessage() {
					return `Time must be exactly at ${hour}:00 WIB`;
				},
			},
		});
	};
}
