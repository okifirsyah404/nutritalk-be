import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../repository/auth.repository";
import { AppConfigService } from "@config/app-config";

@Injectable()
export class AuthSsoService {
	constructor(
		private readonly config: AppConfigService,
		private readonly repository: AuthRepository,
	) {}
}
