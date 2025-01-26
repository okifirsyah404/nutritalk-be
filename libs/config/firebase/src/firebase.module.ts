import { DynamicModule, Global, Module } from "@nestjs/common";
import { FIREBASE_MODULE_OPTIONS } from "./constant/di.key";
import {
	FirebaseModuleAsyncOptions,
	FirebaseModuleOptions,
} from "./interface/firebase-option.interface";
import { FirebaseAuthService } from "./provider/firebase-auth.service";
import { FirebaseService } from "./provider/firebase.service";

@Global()
@Module({})
export class FirebaseModule {
	private static readonly _providers = [FirebaseService, FirebaseAuthService];

	static forRoot(options: FirebaseModuleOptions): DynamicModule {
		const providers = [
			{
				provide: FIREBASE_MODULE_OPTIONS,
				useValue: options,
			},
			...FirebaseModule._providers,
		];

		return {
			module: FirebaseModule,
			providers: providers,
			exports: providers,
		};
	}

	static forRootAsync(options: FirebaseModuleAsyncOptions): DynamicModule {
		const providers = [
			{
				provide: FIREBASE_MODULE_OPTIONS,
				useFactory: options.useFactory,
				inject: options.inject || [],
			},
			...FirebaseModule._providers,
		];

		return {
			module: FirebaseModule,
			imports: options.imports || [],
			providers: providers,
			exports: providers,
		};
	}
}
