import { IGoogleSSORequest } from "../auth/google-sso-request.interface";

export interface IBindGoogleSSORequest extends IGoogleSSORequest {
	alsoChangeEmail?: boolean;
}
