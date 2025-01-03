export interface IOtpRequest {
	email: string;
}

export interface IOtpVerify extends IOtpRequest {
	signature: string;
}
