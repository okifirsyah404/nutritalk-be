import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isMatchOther", async: false })
class IsMatchOtherConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: any): boolean {
		const [relatedPropertyName] = args.constraints;
		const relatedValue = args.object[relatedPropertyName];
		return value === relatedValue;
	}

	defaultMessage(args: any): string {
		const [relatedPropertyName] = args.constraints;
		return `${args.property} must match ${relatedPropertyName}`;
	}
}

export function IsMatchOther(
	property: string,
	validationOptions?: ValidationOptions,
) {
	return function (object: object, propertyName: string): void {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [property],
			validator: IsMatchOtherConstraint,
		});
	};
}
