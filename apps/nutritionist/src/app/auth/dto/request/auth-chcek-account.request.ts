import { PickType } from "@nestjs/swagger";
import { AuthSignInRequest } from "./auth-sign-in.request";

export class AuthCheckAccountRequest extends PickType(AuthSignInRequest, [
	"email",
] as const) {}
