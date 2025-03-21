import { IJwtSignaturePayload, ValidateSignatureOptions } from "@contract";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CryptoUtil } from "@util";
import { SignatureRepository } from "../repository/signature.repository";

@Injectable()
export class SignatureService {
	constructor(
		private readonly repository: SignatureRepository,
		private readonly jwtService: JwtService,
	) {}

	/**
	 *
	 * Generates a JWT signature based on the provided payload, stores the encoded token in the repository,
	 * and returns the generated token.
	 *
	 * @param payload - The payload to be signed and included in the JWT.
	 *
	 * @returns { string } A promise that resolves to the generated JWT token as a string.
	 *
	 */
	async generateSignature(payload: IJwtSignaturePayload): Promise<string> {
		const token = this.jwtService.sign(payload);

		await this.repository.createSignature(CryptoUtil.encodeBase64(token));

		return token;
	}

	/**
	 *
	 * Validates a given signature by encoding it to Base64 and checking its existence in the repository.
	 * Optionally deletes the signature from the repository after validation.
	 *
	 * @param signature - The signature string to be validated.
	 * @param options - Options for validation.
	 * @param options.deleteAfterValidation - Whether to delete the signature from the repository after validation. Defaults to true.
	 *
	 * @returns { boolean } A promise that resolves to a boolean indicating whether the signature is valid.
	 *
	 */
	async validateSignature(
		signature: string,
		options: ValidateSignatureOptions | undefined = {
			deleteAfterValidation: true,
		},
	): Promise<boolean> {
		const encodedSignature = CryptoUtil.encodeBase64(signature);

		const result = await this.repository.getSignature(encodedSignature);

		if (result) {
			if (options.deleteAfterValidation) {
				await this.repository.deleteSignature(encodedSignature);
			}
		}

		return !!result;
	}
}
