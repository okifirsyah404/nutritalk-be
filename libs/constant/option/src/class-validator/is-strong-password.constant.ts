import { IsStrongPasswordOptions } from "class-validator";

export abstract class IsStrongPasswordConstant {
	static readonly STRONG_PASSWORD: IsStrongPasswordOptions = {
		minLength: 8,
		minNumbers: 2,
		minUppercase: 1,
	};
}
