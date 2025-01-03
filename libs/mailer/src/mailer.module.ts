import { DynamicModule, Module } from "@nestjs/common";
import { MAILER_MODULE_OPTIONS } from "./constant/di.key";
import {
	MailerAsyncOptions,
	MailerOptions,
} from "./interface/mailer.interface";
import { MailService } from "./provider/mail.service";
import { MailerService } from "./provider/mailer.service";

@Module({})
export class MailerModule {
	private static readonly providers = [MailerService, MailService];

	/**
	 *
	 * Configures the MailerModule with the given options.
	 *
	 * @param options - Optional configuration for the MailerModule.
	 *
	 * @returns A DynamicModule configured with the provided options.
	 *
	 */
	static forRoot(options?: MailerOptions): DynamicModule {
		return {
			module: MailerModule,
			imports: options?.imports || [],
			global: options?.isGlobal,
			providers: [
				{
					provide: MAILER_MODULE_OPTIONS,
					useValue: options,
				},
				...this.providers,
			],
			exports: this.providers,
		};
	}

	/**
	 *
	 * Configures the MailerModule asynchronously.
	 *
	 * This method allows you to configure the MailerModule using asynchronous options.
	 *
	 * @param options - The asynchronous options for configuring the MailerModule.
	 *
	 * @returns A DynamicModule configured with the provided options.
	 *
	 */
	static forRootAsync(options?: MailerAsyncOptions): DynamicModule {
		return {
			module: MailerModule,
			imports: options?.imports || [],
			global: options?.isGlobal,
			providers: [
				{
					inject: options?.inject || [],
					provide: MAILER_MODULE_OPTIONS,
					useFactory: async (...args: any[]): Promise<MailerOptions> => {
						const result = await options?.useFactory?.(...args);
						return result;
					},
				},
				...this.providers,
			],
			exports: this.providers,
		};
	}
}
