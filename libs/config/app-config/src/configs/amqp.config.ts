import { registerAs } from "@nestjs/config";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";

export type AmqpConfig = {
	host: string;
	port: number;
	url: string;
};

export const amqpConfig = registerAs(
	"amqpConfig",
	(): AmqpConfig => ({
		host: process.env.AMQP_HOST,
		port: parseInt(process.env.AMQP_PORT, 10),
		url: process.env.AMQP_URL,
	}),
);

export class AmpqConfigEnvironmentVariables {
	@IsDefined()
	@IsString()
	AMQP_HOST: string;

	@Type(() => Number)
	@IsDefined()
	@IsNumber()
	AMQP_PORT: number;

	@IsDefined()
	@IsString()
	AMQP_URL: string;
}
