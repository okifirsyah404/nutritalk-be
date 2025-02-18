import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import * as FirebaseAdmin from "firebase-admin";
import { FIREBASE_MODULE_OPTIONS } from "../constant/di.key";
import { FirebaseModuleOptions } from "../interface/firebase-option.interface";

@Injectable()
export class FirebaseService implements OnModuleInit {
	constructor(
		@Inject(FIREBASE_MODULE_OPTIONS)
		private readonly options: FirebaseModuleOptions,
	) {}

	private readonly logger = new Logger(FirebaseService.name);

	private _app: FirebaseAdmin.app.App;
	onModuleInit(): void {
		const credential = FirebaseAdmin.credential.cert(this.options.credential);

		this._app = FirebaseAdmin.initializeApp({
			credential: credential,
			databaseURL: this.options.databaseURL,
			projectId: this.options.projectId,
		});
	}

	get app(): FirebaseAdmin.app.App {
		return this._app;
	}
}
