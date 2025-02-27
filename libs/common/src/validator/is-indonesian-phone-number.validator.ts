import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsIndonesianPhoneNumber", async: false })
export class IsIndonesianPhoneNumberConstraint
	implements ValidatorConstraintInterface
{
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	validate(value: any, _args: ValidationArguments): boolean {
		if (typeof value !== "string") {
			return false;
		}
		// Indonesian phone number regex
		const regex = /^(\+62|62|0)8[0-9][0-9]{6,10}$/;
		return regex.test(value);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	defaultMessage(_args: ValidationArguments): string {
		return "Phone number ($value) is not a valid Indonesian phone number";
	}
}

export function IsIndonesianPhoneNumber(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string): void {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsIndonesianPhoneNumberConstraint,
		});
	};
}
