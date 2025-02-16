import { Injectable } from "@nestjs/common";
import {
	TFirebaseAuth,
	TFirebaseDecodedIdToken,
	TFirebaseUserRecord,
} from "../type/firebase-alias.type";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class FirebaseAuthService {
	constructor(private readonly firebase: FirebaseService) {}

	get auth(): TFirebaseAuth {
		return this.firebase.app.auth();
	}

	async verifyIdToken(idToken: string): Promise<TFirebaseDecodedIdToken> {
		return this.auth.verifyIdToken(idToken);
	}

	async getUser(uid: string): Promise<TFirebaseUserRecord> {
		return this.auth.getUser(uid);
	}
}
