import * as FirebaseAdmin from "firebase-admin";
import { AppOptions } from "firebase-admin";

export type FirebaseModuleOptions = {
	credential?: string | FirebaseAdmin.ServiceAccount;
} & Omit<AppOptions, "credential">;

export interface FirebaseModuleAsyncOptions {
	imports: any[];
	useFactory: (
		...args: any[]
	) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
	inject?: any[];
}
