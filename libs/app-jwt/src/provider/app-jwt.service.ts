import { SetCache } from "@cache/app-cache/decorator/cache-result.decorator";
import { AppConfigService } from "@config/app-config";
import { INutritionistEntity, IPatientEntity } from "@database/prisma";
import { createDatabaseErrorHandler } from "@infrastructure/err_handler/database.error-handler";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { CryptoUtils } from "@util";
import {
	IJwtAccessPayload,
	IJwtRefreshPayload,
	IJwtToken,
	JwtGenerateTokensOptionsParam,
	JwtGenerateTokensParam,
} from "../interface/app-jwt.interface";
import { AppJwtRepository } from "../repository/app-jwt.repository";

@Injectable()
export class AppJwtService {
	constructor(
		private readonly config: AppConfigService,
		private readonly jwtService: JwtService,
		private readonly repository: AppJwtRepository,
	) {}

	/**
	 *
	 * Generates an access token based on the provided payload.
	 *
	 * @param {IJwtAccessPayload} payload - The payload containing the data to be encoded in the access token.
	 *
	 * @returns { string } A promise that resolves to the generated access token as a string.
	 *
	 */
	async generateAccessToken(payload: IJwtAccessPayload): Promise<string> {
		return await this._generateAccessToken(payload);
	}

	/**
	 *
	 * Generates a refresh token for the given payload and optionally saves it.
	 *
	 * @param payload - The payload containing the data to be included in the refresh token.
	 * @param options - Optional parameters for token generation.
	 * @param options.saveAfterGenerate - If true, the generated token will be saved after creation. Defaults to true.
	 *
	 * @returns { string } A promise that resolves to the generated refresh token as a string.
	 *
	 */
	async generateRefreshToken(
		payload: IJwtRefreshPayload,
		options: JwtGenerateTokensOptionsParam | undefined = {
			saveAfterGenerate: true,
		},
	): Promise<string> {
		const token = await this._generateRefreshToken(payload);

		if (options.saveAfterGenerate) {
			await this._updateRefreshToken(payload.sub, token);
		}

		return token;
	}

	/**
	 *
	 * Generates authentication tokens (access and refresh tokens) for a given payload.
	 *
	 * @param payload - The payload containing user information required to generate tokens.
	 * @param options - Optional parameters for token generation.
	 * @param options.saveAfterGenerate - A flag indicating whether to save the refresh token after generation. Defaults to true.
	 *
	 * @returns { IJwtToken } A promise that resolves to an object containing the generated access and refresh tokens.
	 *
	 */
	async generateAuthTokens(
		payload: JwtGenerateTokensParam,
		options: JwtGenerateTokensOptionsParam | undefined = {
			saveAfterGenerate: true,
		},
	): Promise<IJwtToken> {
		const accessToken = await this._generateAccessToken({
			email: payload.email,
			role: payload.role,
			sub: payload.userId,
		});

		const refreshToken = await this._generateRefreshToken({
			sub: payload.sub,
			email: payload.email,
		});

		if (options.saveAfterGenerate) {
			await this._updateRefreshToken(payload.sub, refreshToken);
		}

		return { accessToken, refreshToken };
	}

	/**
	 *
	 * Validates the provided refresh token for the given account ID.
	 *
	 * @param accountId - The ID of the account to validate the refresh token for.
	 * @param refreshToken - The refresh token to be validated.
	 *
	 * @returns { boolean } A promise that resolves to a boolean indicating whether the refresh token is valid.
	 *
	 */
	async validateRefreshToken(
		accountId: string,
		refreshToken: string,
	): Promise<boolean> {
		const encoded = CryptoUtils.encodeBase64(refreshToken);

		const result = await this.repository
			.findAccountByIdAndRefreshToken(accountId, encoded)
			.catch(createDatabaseErrorHandler);

		return !!result;
	}

	/**
	 *
	 * Validates the access token and retrieves the corresponding user based on the payload's role.
	 *
	 * @param payload - The JWT access payload containing the user's role and ID.
	 *
	 * @returns { INutritionistEntity | IPatientEntity | null} A promise that resolves to the user object (either a Nutritionist or a Patient) if found, or null if the role is not recognized or the user is not found.
	 *
	 */
	async validateAccessToken(
		payload: IJwtAccessPayload,
	): Promise<INutritionistEntity | IPatientEntity | null> {
		switch (payload.role) {
			case Role.NUTRITIONIST:
				return await this.repository.findNutritionistById(payload.sub);
			case Role.PATIENT:
				return await this.repository.findPatientById(payload.sub);
			default:
				return null;
		}
	}

	/**
	 *
	 * Retrieves a patient by their unique identifier.
	 *
	 * @param id - The unique identifier of the patient.
	 *
	 * @returns A promise that resolves to the patient object.
	 *
	 * @throws Will throw an error if the patient cannot be found or if there is a database error.
	 *
	 */
	async getPatientById(id: string): Promise<IPatientEntity> {
		return await this.repository
			.findPatientById(id)
			.catch(createDatabaseErrorHandler);
	}

	/**
	 *
	 * Retrieves a nutritionist by their unique identifier.
	 *
	 * @param id - The unique identifier of the nutritionist.
	 *
	 * @returns A promise that resolves to an `INutritionist` object.
	 *
	 * @throws Will throw an error if there is an issue with the database operation.
	 *
	 */
	@SetCache<INutritionistEntity>((id: string) => id)
	async getNutritionistById(id: string): Promise<INutritionistEntity> {
		return await this.repository
			.findNutritionistById(id)
			.catch(createDatabaseErrorHandler);
	}

	/**
	 *
	 * Deletes the refresh token associated with the given account ID.
	 *
	 * @param accountId - The ID of the account whose refresh token is to be deleted.
	 *
	 * @returns A promise that resolves when the refresh token has been deleted.
	 *
	 */
	async deleteRefreshToken(accountId: string): Promise<void> {
		await this._deleteRefreshToken(accountId);
	}

	/**
	 *
	 * Generates an access token asynchronously.
	 *
	 * @param payload - The payload to be included in the JWT access token.
	 *
	 * @returns A promise that resolves to the generated JWT access token as a string.
	 *
	 */
	private async _generateAccessToken(
		payload: IJwtAccessPayload,
	): Promise<string> {
		return await this.jwtService.signAsync(payload);
	}

	/**
	 *
	 * Generates a refresh token asynchronously.
	 *
	 * @param payload - The payload to include in the refresh token.
	 *
	 * @returns A promise that resolves to the generated refresh token string.
	 *
	 */
	private async _generateRefreshToken(
		payload: IJwtRefreshPayload,
	): Promise<string> {
		return await this.jwtService.signAsync(payload, {
			secret: this.config.jwtConfig.refreshTokenSecret,
			expiresIn: this.config.jwtConfig.refreshTokenExpiresIn,
		});
	}

	/**
	 *
	 * Updates the refresh token for a given account.
	 *
	 * @param accountId - The ID of the account to update the refresh token for.
	 * @param refreshToken - The new refresh token to be encoded and stored.
	 *
	 * @returns A promise that resolves when the refresh token has been updated.
	 *
	 * @throws Will throw an error if the update operation fails.
	 *
	 */
	private async _updateRefreshToken(
		accountId: string,
		refreshToken: string,
	): Promise<void> {
		const encoded = CryptoUtils.encodeBase64(refreshToken);

		await this.repository
			.updateRefreshToken(accountId, encoded)
			.catch(createDatabaseErrorHandler);
	}

	/**
	 *
	 * Deletes the refresh token for a given account by setting it to null.
	 *
	 * @param accountId - The ID of the account whose refresh token is to be deleted.
	 *
	 * @returns A promise that resolves when the refresh token has been deleted.
	 *
	 * @throws Will propagate any errors encountered during the database update operation.
	 *
	 */
	private async _deleteRefreshToken(accountId: string): Promise<void> {
		await this.repository
			.updateRefreshToken(accountId, null)
			.catch(createDatabaseErrorHandler);
	}
}
