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
		this._app = FirebaseAdmin.initializeApp({
			credential: FirebaseAdmin.credential.cert(this.options.credential),
			databaseURL: this.options.databaseURL,
		});

		this.logger.log("Firebase app initialized");
	}

	get app(): FirebaseAdmin.app.App {
		return this._app;
	}
}
