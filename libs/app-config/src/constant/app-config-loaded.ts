import { ConfigModule } from '@nestjs/config';
import { AmqpConfig } from '../configs/amqp.config';
import { AppNutritionistConfig } from '../configs/app-nutrtitionist.config';
import { AppConfig, Environment } from '../configs/app.config';
import { BcryptConfig } from '../configs/bcrypt.config';
import { DatabaseConfig } from '../configs/database.config';
import { DocsConfig } from '../configs/docs.config';
import { JwtConfig } from '../configs/jwt.config';
import { MultipartConfig } from '../configs/multipart.config';
import { PaggingConfig } from '../configs/pagging.config';
import { RedisConfig } from '../configs/redis.config';
import { S3Config } from '../configs/s3.config';
import { SmtpConfig } from '../configs/smtp.config';
import { ThrottleConfig } from '../configs/throttle.config';

export class AppConfigLoaded {
  static async appConfig(): Promise<AppConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      env: Environment[process.env.NODE_ENV.toUpperCase()] || Environment.DEV,
      host: process.env.APP_HOST,
    };
  }

  static async appNutritionistConfig(): Promise<AppNutritionistConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      port: parseInt(process.env.APP_NUTRITIONIST_PORT, 10),
    };
  }

  static async jwtConfig(): Promise<JwtConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      accessTokenSecret: process.env.JWT_SECRET,
      accessTokenExpiresIn: process.env.JWT_EXPIRES_IN,
      refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
      refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      signatureTokenSecret: process.env.JWT_SIGNATURE_SECRET,
      signatureTokenExpiresIn: process.env.JWT_SIGNATURE_EXPIRES_IN,
    };
  }

  static async docsConfig(): Promise<DocsConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      endpoint: 'docs',
      title: '',
      description: '',
      version: '',
      customCss: process.env.DOCS_CUSTOM_CSS_URL?.split(',') || [],
    };
  }

  static async s3Config(): Promise<S3Config> {
    await ConfigModule.envVariablesLoaded;

    return {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      endPoint: process.env.S3_ENDPOINT,
      bucketName: process.env.S3_BUCKET_NAME,
      region: process.env.S3_REGION,
    };
  }

  static async redisConfig(): Promise<RedisConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      database: parseInt(process.env.REDIS_DB),
      url: process.env.REDIS_URL,
      ttl: parseInt(process.env.REDIS_TTL),
    };
  }

  static async smtpConfig(): Promise<SmtpConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    };
  }

  static async throttleConfig(): Promise<ThrottleConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      enable: process.env.APP_ENABLE_THROTTLE === 'true',
      ttl: parseInt(process.env.APP_THROTTLE_TTL),
      limit: parseInt(process.env.APP_THROTTLE_LIMIT),
    };
  }

  static async paginationConfig(): Promise<PaggingConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      maxPageSize: parseInt(process.env.APP_PAGINATION_MAX_PAGE_SIZE),
      defaultPageSize: parseInt(process.env.APP_PAGINATION_DEFAULT_PAGE_SIZE),
    };
  }

  static async multipartConfig(): Promise<MultipartConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      fieldMaxCount: parseInt(process.env.MULTIPART_FIELD_MAX_COUNT),
      fieldMaxSize: parseInt(process.env.MULTIPART_FIELD_MAX_SIZE),
      fileMaxCount: parseInt(process.env.MULTIPART_FILE_MAX_COUNT),
      fileMaxSize: parseInt(process.env.MULTIPART_FILE_MAX_SIZE),
    };
  }

  static async databaseConfig(): Promise<DatabaseConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      provider: process.env.DB_PROVIDER,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      name: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      url: process.env.DATABASE_URL,
      shadowUrl: process.env.SHADOW_DATABASE_URL,
    };
  }

  static async bcryptConfig(): Promise<BcryptConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    };
  }

  static async amqpConfig(): Promise<AmqpConfig> {
    await ConfigModule.envVariablesLoaded;

    return {
      host: process.env.AMQP_HOST,
      port: parseInt(process.env.AMQP_PORT, 10),
      url: process.env.AMQP_URL,
    };
  }
}
