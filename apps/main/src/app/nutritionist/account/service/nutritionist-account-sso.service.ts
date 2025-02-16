import { FirebaseAuthService } from "@config/firebase";
import { Injectable } from "@nestjs/common";
import { NutritionistAccountSSORepository } from "../repository/nutritionist-account-sso.repository";

@Injectable()
export class NutritionistAccountSSOService {
	constructor(
		private readonly repostory: NutritionistAccountSSORepository,
		private readonly firebaseAuth: FirebaseAuthService,
	) {}
}
