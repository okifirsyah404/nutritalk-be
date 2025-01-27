export interface IChangePasswordRequest {
	password: string;
	confirmPassword: string;
	signature: string;
}
