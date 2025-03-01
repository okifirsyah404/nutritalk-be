import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AmqpConfig } from "../configs/amqp.config";
import { AppAdminConfig } from "../configs/app-admin.config";
import { AppNutritionistConfig } from "../configs/app-nutritionist.config";
import { AppConfig } from "../configs/app.config";
import { BcryptConfig } from "../configs/bcrypt.config";
import { DatabaseConfig } from "../configs/database.config";
import { DiceBearConfig } from "../configs/dice-bear.config";
import { DocsConfig } from "../configs/docs.config";
import { JwtConfig } from "../configs/jwt.config";
import { MultipartConfig } from "../configs/multipart.config";
import { PaggingConfig } from "../configs/pagging.config";
import { RedisConfig } from "../configs/redis.config";
import { S3Config } from "../configs/s3.config";
import { SmtpConfig } from "../configs/smtp.config";
import { ThrottleConfig } from "../configs/throttle.config";

/**
 *
 * Service to manage and provide application configuration settings.
 *
 */
@Injectable()
export class AppConfigService {
	constructor(private readonly config: ConfigService) {}

	/**
	 * Retrieves the application configuration.
	 *
	 * @returns {AppConfig} The application configuration object.
	 */
	get appConfig(): AppConfig {
		return this.config.get<AppConfig>("appConfig");
	}

	/**
	 * Retrieves the application admin configuration.
	 *
	 * @returns {AppAdminConfig} The application admin configuration object.
	 */
	get appAdminConfig(): AppAdminConfig {
		return this.config.get<AppAdminConfig>("appAdminConfig");
	}

	/**
	 * Retrieves the application nutritionist configuration.
	 *
	 * @returns {AppNutritionistConfig} The application nutritionist configuration object.
	 */
	get appNutritionistConfig(): AppNutritionistConfig {
		return this.config.get<AppNutritionistConfig>("appNutritionistConfig");
	}

	/**
	 * Retrieves the application patient configuration.
	 *
	 * @returns {AppNutritionistConfig} The application patient configuration object.
	 */
	get appPatientConfig(): AppNutritionistConfig {
		return this.config.get<AppNutritionistConfig>("appPatientConfig");
	}

	/**
	 * Retrieves the JWT configuration settings.
	 *
	 * @returns {JwtConfig} The JWT configuration settings.
	 */
	get jwtConfig(): JwtConfig {
		return this.config.get<JwtConfig>("jwtConfig");
	}

	/**
	 * Retrieves the configuration settings for DiceBear.
	 *
	 * @returns {DiceBearConfig} The configuration object for DiceBear.
	 */
	get diceBearConfig(): DiceBearConfig {
		return this.config.get<DiceBearConfig>("diceBearConfig");
	}

	/**
	 * Retrieves the configuration settings for swagger documentation.
	 *
	 * @returns {DocsConfig} The configuration object for swagger documentation.
	 */
	get docsConfig(): DocsConfig {
		return this.config.get<DocsConfig>("docsConfig");
	}

	/**
	 * Retrieves the S3 configuration settings.
	 *
	 * @returns {S3Config} The S3 configuration object.
	 */
	get s3Config(): S3Config {
		return this.config.get<S3Config>("s3Config");
	}

	/**
	 * Retrieves the Redis configuration settings.
	 *
	 * @returns {RedisConfig} The configuration settings for Redis.
	 */
	get redisConfig(): RedisConfig {
		return this.config.get<RedisConfig>("redisConfig");
	}

	/**
	 * Retrieves the SMTP configuration.
	 *
	 * @returns {SmtpConfig} The SMTP configuration object.
	 */
	get smtpConfig(): SmtpConfig {
		return this.config.get<SmtpConfig>("smtpConfig");
	}

	/**
	 * Retrieves the throttle configuration settings.
	 *
	 * @returns {ThrottleConfig} The throttle configuration.
	 */
	get throttleConfig(): ThrottleConfig {
		return this.config.get<ThrottleConfig>("throttleConfig");
	}

	/**
	 * Retrieves the pagination configuration.
	 *
	 * @returns {PaggingConfig} The pagination configuration object.
	 */
	get paginationConfig(): PaggingConfig {
		return this.config.get<PaggingConfig>("paginationConfig");
	}

	/**
	 * Retrieves the multipart configuration settings.
	 *
	 * @returns {MultipartConfig} The multipart configuration object.
	 */
	get multipartConfig(): MultipartConfig {
		return this.config.get<MultipartConfig>("multipartConfig");
	}

	/**
	 * Retrieves the database configuration settings.
	 *
	 * @returns {DatabaseConfig} The database configuration object.
	 */
	get databaseConfig(): DatabaseConfig {
		return this.config.get<DatabaseConfig>("databaseConfig");
	}

	/**
	 * Retrieves the bcrypt configuration settings.
	 *
	 * @returns {BcryptConfig} The bcrypt configuration object.
	 */
	get bcryptConfig(): BcryptConfig {
		return this.config.get<BcryptConfig>("bcryptConfig");
	}

	get amqpConfig(): AmqpConfig {
		return this.config.get<AmqpConfig>("amqpConfig");
	}
}
