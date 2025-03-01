import { registerAs } from "@nestjs/config";
import { IsDefined, IsNumberString, IsString } from "class-validator";

export type DiceBearConfig = {
	url: string;
	size: number;
};

export const diceBearConfig = registerAs(
	"diceBearConfig",
	(): DiceBearConfig => ({
		url: process.env.DICEBEAR_URL,
		size: parseInt(process.env.DICEBEAR_SIZE),
	}),
);

export class DiceBearEnvironmentVariables {
	@IsString()
	@IsDefined()
	DICEBEAR_URL!: string;

	@IsNumberString()
	@IsDefined()
	DICEBEAR_SIZE!: string;
}
