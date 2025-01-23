import { Injectable } from "@nestjs/common";

/**
 * A utility class for encoding and decoding strings using Base64 format.
 */
@Injectable()
export class CryptoUtils {
	/**
	 * Encodes a given string into Base64 format.
	 *
	 * @param data - The string to be encoded.
	 * @returns A promise that resolves to the Base64 encoded string.
	 */
	encodeBase64(data: string): string {
		return Buffer.from(data).toString("base64");
	}

	/**
	 * Decodes a Base64 encoded string.
	 *
	 * @param data - The Base64 encoded string to decode.
	 * @returns A promise that resolves to the decoded string.
	 */
	decodeBase64(data: string): string {
		return Buffer.from(data, "base64").toString();
	}

	static encodeBase64(data: string): string {
		return new CryptoUtils().encodeBase64(data);
	}

	static decodeBase64(data: string): string {
		return new CryptoUtils().decodeBase64(data);
	}
}
