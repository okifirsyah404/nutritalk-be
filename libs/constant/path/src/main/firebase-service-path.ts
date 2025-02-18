import { join } from "path";

export abstract class FirebaseServicePath {
	static readonly FIREBASE_SERVICE_FILE_PATH = join(
		process.cwd(),
		".credentials",
		"firebase-service-account.json",
	);
}
