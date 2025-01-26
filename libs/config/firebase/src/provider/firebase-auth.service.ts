import { Injectable } from "@nestjs/common";
import * as FirebaseAdmin from "firebase-admin";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class FirebaseAuthService {
	constructor(private readonly firebase: FirebaseService) {}

	get auth(): FirebaseAdmin.auth.Auth {
		return this.firebase.app.auth();
	}

	async verifyIdToken(
		idToken: string,
	): Promise<FirebaseAdmin.auth.DecodedIdToken> {
		return this.auth.verifyIdToken(idToken);
	}

	async getUser(uid: string): Promise<FirebaseAdmin.auth.UserRecord> {
		return this.auth.getUser(uid);
	}
}
