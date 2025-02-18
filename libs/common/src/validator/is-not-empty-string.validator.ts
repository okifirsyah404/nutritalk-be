import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isNotEmptyString", async: false })
class IsNotEmptyStringConstraint implements ValidatorConstraintInterface {
	validate(value: any): boolean {
		return (
			value === null ||
			value === undefined ||
			(typeof value === "string" && value.trim() !== "")
		);
	}

	defaultMessage(): string {
		return "Value must not be an empty string";
	}
}

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string): void {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsNotEmptyStringConstraint,
		});
	};
}
