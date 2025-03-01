import { IntersectionType } from "@nestjs/mapped-types";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { AmpqConfigEnvironmentVariables } from "../configs/amqp.config";
import { AppAdminEnvironmentVariables } from "../configs/app-admin.config";
import { AppNutritionistEnvironmentVariables } from "../configs/app-nutritionist.config";
import { AppPatientEnvironmentVariables } from "../configs/app-patient.config";
import { AppEnvironmentVariables } from "../configs/app.config";
import { BcryptEnvironmentVariables } from "../configs/bcrypt.config";
import { DatabaseEnvironmentVariables } from "../configs/database.config";
import { DiceBearEnvironmentVariables } from "../configs/dice-bear.config";
import { JwtEnvironmentVariables } from "../configs/jwt.config";
import { MultipartEnvironmentVariables } from "../configs/multipart.config";
import { PaggingEnvironmentVariables } from "../configs/pagging.config";
import { RedisEnvironmentVariables } from "../configs/redis.config";
import { SmtpEnvironmentVariables } from "../configs/smtp.config";
import { ThrottleEnvironmentVariables } from "../configs/throttle.config";

class EnvironmentVariables extends IntersectionType(
	AppEnvironmentVariables,
	AppAdminEnvironmentVariables,
	AppNutritionistEnvironmentVariables,
	AppPatientEnvironmentVariables,
	JwtEnvironmentVariables,
	RedisEnvironmentVariables,
	DiceBearEnvironmentVariables,
	SmtpEnvironmentVariables,
	ThrottleEnvironmentVariables,
	MultipartEnvironmentVariables,
	PaggingEnvironmentVariables,
	DatabaseEnvironmentVariables,
	BcryptEnvironmentVariables,
	AmpqConfigEnvironmentVariables,
	//   FirebaseEnvironmentVariables,
) {}

/**
 * Validates the provided configuration object on env files.
 *
 * @param config - The configuration object to validate.
 * @returns The validated configuration object.
 * @throws Error if any environment variable is missing or doesn't match the expected type.
 */
export function validateConfig(
	config: Record<string, unknown>,
): EnvironmentVariables {
	// Convert the plain object to an instance of the EnvironmentVariables class.
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});

	// Validate the configuration object.
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		const errorMessages = errors
			.map((error) => JSON.stringify(error))
			.join("\n");
		throw new Error(
			`Some Env was missing or didn't match \n ${errorMessages}`,
			{
				cause: errorMessages,
			},
		);
	}
	return validatedConfig;
}
