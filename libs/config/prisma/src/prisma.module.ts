import { AppConfigModule } from "@config/app-config";
import { DynamicModule, Global, Module } from "@nestjs/common";
import { PRISMA_MODULE_OPTIONS } from "./constant/di.key";
import {
	PrismaModuleAsyncOptions,
	PrismaModuleOptions,
} from "./interface/prisma.interface";
import { PrismaService } from "./provider/prisma.service";

@Global()
@Module({})
export class PrismaModule {
	private static readonly _providers: any[] = [PrismaService];

	static forRoot(option?: PrismaModuleOptions): DynamicModule {
		return {
			module: PrismaModule,
			imports: [AppConfigModule, ...(option?.imports || [])],
			providers: [
				{
					provide: PRISMA_MODULE_OPTIONS,
					useValue: option,
				},
				...this._providers,
			],
			exports: [PrismaService],
		};
	}

	static forRootAsync(option?: PrismaModuleAsyncOptions): DynamicModule {
		return {
			module: PrismaModule,
			imports: [AppConfigModule, ...(option?.imports || [])],
			providers: [
				{
					inject: option?.inject || [],
					provide: PRISMA_MODULE_OPTIONS,
					useFactory: async (...args: any[]): Promise<PrismaModuleOptions> => {
						const result = await option?.useFactory?.(...args);
						return result;
					},
				},
				...this._providers,
			],
			exports: [PrismaService],
		};
	}
}
