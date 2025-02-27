import { FirebaseErrorMessage } from "@constant/message";
import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import {
	TFirebaseAuth,
	TFirebaseDecodedIdToken,
	TFirebaseUserRecord,
} from "../type/firebase-alias.type";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class FirebaseAuthService {
	constructor(private readonly firebase: FirebaseService) {}

	private readonly logger = new Logger(FirebaseAuthService.name);

	get auth(): TFirebaseAuth {
		return this.firebase.app.auth();
	}

	async verifyIdToken(idToken: string): Promise<TFirebaseDecodedIdToken> {
		return this.auth.verifyIdToken(idToken, true).catch(() => {
			throw new InternalServerErrorException(
				FirebaseErrorMessage.ERR_FIREBASE_AUTHENTICATION_INVALID,
			);
		});
	}

	async getUser(uid: string): Promise<TFirebaseUserRecord> {
		return this.auth.getUser(uid).catch(() => {
			throw new InternalServerErrorException(
				FirebaseErrorMessage.ERR_FIREBASE_AUTHENTICATION,
			);
		});
	}

	async getUserByIdToken(idToken: string): Promise<TFirebaseUserRecord> {
		const decodedIdToken = await this.verifyIdToken(idToken);

		return this.getUser(decodedIdToken.uid);
	}
}
