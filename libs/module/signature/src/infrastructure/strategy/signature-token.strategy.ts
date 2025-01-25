import { AppConfigService } from "@config/app-config";
import { IJwtSignaturePayload } from "@contract";
import { SignatureService } from "@module/signature/provider/signature.service";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class SignatureTokenStrategy extends PassportStrategy(
	Strategy,
	"jwt-signature",
) {
	private readonly logger = new Logger(SignatureTokenStrategy.name);

	constructor(
		private readonly appConfig: AppConfigService,
		private readonly service: SignatureService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField("signature"),
			ignoreExpiration: false,
			secretOrKey: appConfig.jwtConfig.signatureTokenSecret,
			passReqToCallback: true,
		});
	}

	async validate(
		req: Request,
		payload: IJwtSignaturePayload,
	): Promise<IJwtSignaturePayload> {
		const signatureToken = req.body["signature"] as string;

		const signature = await this.service.validateSignature(signatureToken, {
			deleteAfterValidation: true,
		});

		if (!signature) {
			throw new UnauthorizedException("Signature not found");
		}

		return payload;
	}
}
