import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appNutritionistConfig } from "./configs/app-nutrtitionist.config";
import { appConfig } from "./configs/app.config";
import { bcryptConfig } from "./configs/bcrypt.config";
import { databaseConfig } from "./configs/database.config";
import { docsConfig } from "./configs/docs.config";
import { jwtConfig } from "./configs/jwt.config";
import { multipartConfig } from "./configs/multipart.config";
import { paggingConfig } from "./configs/pagging.config";
import { redisConfig } from "./configs/redis.config";
import { s3Config } from "./configs/s3.config";
import { smtpConfig } from "./configs/smtp.config";
import { throttleConfig } from "./configs/throttle.config";
import { AppConfigService } from "./provider/app-config.service";
import { validateConfig } from "./validation/config-validation";

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				".env.local",
				".env.development",
				".env.staging",
				".env.test",
				".env.production",
				".env",
			],
			load: [
				appConfig,
				appNutritionistConfig,
				jwtConfig,
				docsConfig,
				s3Config,
				redisConfig,
				smtpConfig,
				throttleConfig,
				paggingConfig,
				multipartConfig,
				databaseConfig,
				bcryptConfig,
			],
			validate: validateConfig,
		}),
	],
	providers: [AppConfigService],
	exports: [AppConfigService],
})
export class AppConfigModule {}
