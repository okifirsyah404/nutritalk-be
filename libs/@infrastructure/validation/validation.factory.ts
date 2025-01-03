import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

/**
 * Custom validation exception factory.
 *
 * This function will catch all validation errors and throw BadRequestException with the first error message
 *
 * @param errors
 */
export function validationExceptionFactory(errors: ValidationError[]): void {
	errors.map((error) => {
		throw new BadRequestException(
			`${error.constraints?.[Object.keys(error.constraints)[0]]}`,
		);
	});
}
